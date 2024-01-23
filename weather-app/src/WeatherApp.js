import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
} from "@material-ui/core";
import "./weather.css";

const WeatherApp = () => {
  // state declaration
  const [location, setLocation] = useState("");
  const [data, setData] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // method to make api call
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://mocki.io/v1/2b223e9f-d3da-42b7-8d3f-cd1e298262a8"
      );
      setData(response.data);
    } catch (error) {
      console.log("Found err");
    }
  };

  // method to fetch data based on location
  const fetchLocationInfo = () => {
    if (data) {
      const weatherInfo = data.filter((item) => item.location === location);
      setWeatherData(weatherInfo);
    }
  };

  const handleChange = (e) => {
    // Update state
    setLocation(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // fetch data when location changes
    fetchLocationInfo();
  }, [location, data]);

  useEffect(() => {}, [weatherData]);

  return (
    <>
      <AppBar position="static" className="appBarstyle">
        <Toolbar>
          <Typography variant="h4">Weather App</Typography>
        </Toolbar>
      </AppBar>
      <div className="backgroundStyle">
        <Paper elevation={3} className="glassmorphicStyle">
          <FormControl style={{ width: "460px" }}>
            <InputLabel id="location-label" className="addColor">
              Select Location
            </InputLabel>
            <Select
              labelId="location-label"
              id="location"
              value={location}
              onChange={handleChange}
            >
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Bangalore">Bangalore</MenuItem>
              <MenuItem value="Coimbatore">Coimbatore</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        {weatherData
          ? weatherData.map((location) => (
              <Paper elevation={3} className="glassmorphicStyle">
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Avatar
                      alt="CloudImage"
                      src="/cloudicon.png"
                      style={{ width: "84px", height: "84px" }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h3" className="addColor">
                      {location.temperature}°C
                    </Typography>
                    <Typography variant="h4" className="addColor">
                      {location.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className="location">
                      {location.location}
                    </Typography>
                    <Typography className="day">Jan 23</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                  <Grid item>
                    <Typography className="feature">AirQuality</Typography>
                    <Typography className="value">
                      {location.airQuality}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="feature">Wind</Typography>
                    <Typography className="value">{location.wind}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="feature">Humidity</Typography>
                    <Typography className="value">
                      {location.humidity}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="feature">Visibility</Typography>
                    <Typography className="value">
                      {location.visibility}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="feature">Pressure</Typography>
                    <Typography className="value">
                      {location.pressure}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="feature">Dew Point</Typography>
                    <Typography className="value">
                      {location.dewPoint}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))
          : " "}
      </div>
    </>
  );
};

export default WeatherApp;
