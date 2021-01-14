import _ from 'lodash';
import './App.css';
import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import { addDays, addMinutes, format } from 'date-fns';
import { TimeSeries, TimeRangeEvent, TimeRange } from 'pondjs';
import { Charts, ChartContainer, ChartRow, EventChart, YAxis, LineChart, Resizable } from 'react-timeseries-charts';


function outageEventStyleFunc(event, state) {
  const color = 'cyan';
  switch (state) {
    case "normal":
      return {
        fill: color,
        opacity: 0.5,
        stroke: 'black',
        strokeWidth: 1,
      };
    case "hover":
      return {
        fill: color,
        opacity: 0.4
      };
    case "selected":
      return {
        fill: color
      };
    default:
    //pass
  }
}

const now = new Date();

function App() {

  const [files, setFiles] = useState([]);
  const [series, setSeries] = useState(new TimeSeries({ name: 'files', events: [] }));
  const [seriesActivitySegment, setSeriesActivitySegment] = useState(new TimeSeries({ name: 'ActivitySegment', events: [] }));
  const [seriesPlaceVisit, setSeriesPlaceVisit] = useState(new TimeSeries({ name: 'PlaceVisit', events: [] }));
  const [tracker, setTracker] = useState(new Date());
  const [timeRange, setTimeRange] = useState(new TimeRange([addDays(now, -30), addDays(now, 30)]));

  useEffect(() => {
    fetch('/files', {method: 'POST'})
      .then((res) => res.json())
      .then(({files}) => {
        setFiles(files);
        setSeries(new TimeSeries({
          name: 'files',
          events: files.map(
            ({ created, md }) => {
              const createdDate = new Date(created);
              return new TimeRangeEvent(new TimeRange([createdDate, addDays(createdDate, 1)]), md)
            }
          )
        }));
        setTimeRange(new TimeRange([new Date(files[0].created), new Date(files[files.length - 1].created)]))
      });



    fetch('/locations', {method: 'POST'})
      .then((res) => res.json())
      .then(({history}) => {

        const { activitySegment, placeVisit } = _(history)
          .map(year => _.reduce(
          year,
          (acc, { timelineObjects }) => acc.concat(timelineObjects),
          []))
          .flatten()
          .takeRight(1000)
          .groupBy((obj) => _.keys(obj)[0]) // each timelineObject contains a single key: activitySegment|placeVisit
          .value();

        setSeriesActivitySegment(new TimeSeries({
          name: 'ActivitySegment',
          events: activitySegment.map(
            ({
               activitySegment: {
                 activityType,
                 duration: {endTimestampMs, startTimestampMs},
                 endLocation,
                 simplifiedRawPath,
                 startLocation,
               }
             }) => new TimeRangeEvent(new TimeRange([new Date(parseInt(startTimestampMs, 10)), new Date(parseInt(endTimestampMs, 10))]), {
               activityType,
            })
          )
        }));


        setSeriesPlaceVisit(new TimeSeries({
          name: 'PlaceVisit',
          events: placeVisit.map(
            ({
               placeVisit: {
                 centerLatE7,
                 centerLngE7,
                 duration: {endTimestampMs, startTimestampMs},
                 location: {
                   name,
                   /*
                   *  address: "133 W Phil Ellena St↵Philadelphia, PA 19119↵USA"
                      latitudeE7: 400495818
                      locationConfidence: 59.520004
                      longitudeE7: -751877989
                      name: "133 W Phil Ellena St"
                      placeId: "ChIJFfbtubG5xokRybNtRNqkXw4"*/
                 },
                 placeConfidence,
                 visitConfidence,
               }
             }) => new TimeRangeEvent(new TimeRange([new Date(parseInt(startTimestampMs, 10)), new Date(parseInt(endTimestampMs, 10))]), {
              name,
            })
          )
        }));
      });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
      </header>

      <Resizable>
        <ChartContainer
          enablePanZoom={true}
          format={f => format(f, 'yyyy-MM-dd_HH.mm.ss')}
          onTimeRangeChanged={setTimeRange}
          onTrackerChanged={(t) => setTracker(t)}
          timeAxisTickCount={2}
          timeRange={timeRange}
          trackerPosition={tracker}
          transition={300}
        >
          <ChartRow
            height="100"
            trackerInfoHeight={0}
            trackerInfoValues={[{ label: '', value: '' }]}
          >
            <Charts>
              <EventChart
                onSelectionChange={(e) => {console.log(e.data().toJS())}}
                series={series}
                size={100}
                style={outageEventStyleFunc}
                textOffsetY={50}
                title="Logs"
                label={e => e.data().getIn([0, 'raw'])}
              />
            </Charts>
          </ChartRow>

          <ChartRow
            height="50"
            trackerInfoHeight={0}
            trackerInfoValues={[{ label: '', value: '' }]}
          >
            <Charts>
              <EventChart
                onSelectionChange={(e) => {console.log(e.data().toJS())}}
                series={seriesActivitySegment}
                size={100}
                style={outageEventStyleFunc}
                textOffsetY={50}
                title="Logs"
                label={e => e.data().getIn(['activityType'])}
              />
            </Charts>
          </ChartRow>

          <ChartRow
            height="50"
            trackerInfoHeight={0}
            trackerInfoValues={[{ label: '', value: '' }]}
          >
            <Charts>
              <EventChart
                onSelectionChange={(e) => {console.log(e.data().toJS())}}
                series={seriesPlaceVisit}
                size={100}
                style={outageEventStyleFunc}
                textOffsetY={50}
                title="Logs"
                label={e => e.data().getIn(['name'])}
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>


    </div>
  );
}

export default App;
