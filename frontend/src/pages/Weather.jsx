import React, { useState } from "react";
import styles from "../assets/css/Weather.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import * as UserService from "../services/UserService";
import Icons from "../assets/images/index";
import Loading from "../components/Loading";
const cx = classNames.bind(styles);
const Weather = () => {
    const [isPending, setIsPending] = useState(false);
    const [cityName, setCityName] = useState("");

    const [data, setData] = useState({
        temp: 0,
        humidity: 0,
        temp_min: 0,
        temp_max: 0,
    });

    const getWeatherIcon = (temp, humidity) => {
        // console.log("Rain icon path:", Icons.RainIcon);

        if (humidity > 80) return "rain";
        if (temp > 30) return "sun";
        if (temp < 15) return "snow";
        return "cloud";
    };

    const handlegetWeather = async (values) => {
        try {
            setIsPending(true);
            const res = await UserService.getWeather(values);
            setData({
                temp: res?.data?.data?.main?.temp,
                humidity: res?.data?.data?.main?.humidity,
                temp_min: res?.data?.data?.main?.temp_min,
                temp_max: res?.data?.data?.main?.temp_max,
            });
            console.log("res", res);
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div className={cx("weather-wrapper")}>
                    <div className={cx("header")}>
                        <h2>Weather</h2>
                        <FontAwesomeIcon
                            className={cx("header-icon")}
                            icon={faCloudMoon}
                        />
                    </div>
                    <div className={cx("body")}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const rawCity = e.target.city.value; // <-- input name="city"
                                if (!rawCity) return; // nếu input trống thì thoát

                                const city = rawCity
                                    .normalize("NFD") // tách dấu
                                    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
                                    .replace(/đ/g, "d")
                                    .replace(/Đ/g, "D")
                                    .toLowerCase()
                                    .replace(/\s+/g, "")
                                    .trim();

                                handlegetWeather(city);

                                if (city === "hanoi") {
                                    setCityName("Hà Nội");
                                }
                                if (city === "hochiminh" || city === "saigon") {
                                    setCityName("Hồ Chí Minh");
                                }

                                if (city === "danang") {
                                    setCityName("Đà Nẵng");
                                }
                                if (city === "cantho") {
                                    setCityName("Cần Thơ");
                                }
                            }}
                        >
                            <label htmlFor="city" className={cx("search")}>
                                <input
                                    name="city"
                                    id="city"
                                    type="text"
                                    className={cx("search-input")}
                                    placeholder="Search your place..."
                                />
                                <button className={cx("search-btn")}>
                                    Search
                                </button>
                            </label>
                        </form>
                        <div className={cx("weather-card")}>
                            {isPending ? (
                                <Loading isLoading={isPending} />
                            ) : (
                                <>
                                    <div className={cx("header")}>
                                        <div className={cx("header-left")}>
                                            <h3 className={cx("city")}>
                                                {cityName}
                                            </h3>
                                            <span
                                                className={cx(
                                                    "weather-card-date"
                                                )}
                                            >
                                                {new Date().toDateString()}
                                            </span>
                                            <span
                                                className={cx("current-temp")}
                                            >
                                                {data.temp} °
                                            </span>
                                        </div>
                                        <div className={cx("header-right")}>
                                            <div className={cx("header-right")}>
                                                <div
                                                    className={cx(
                                                        "header-right"
                                                    )}
                                                >
                                                    {getWeatherIcon(
                                                        data.temp,
                                                        data.humidity
                                                    ) === "sun" && (
                                                        <Icons.SunnyIcon
                                                            className={cx(
                                                                "icon"
                                                            )}
                                                        />
                                                    )}
                                                    {getWeatherIcon(
                                                        data.temp,
                                                        data.humidity
                                                    ) === "rain" && (
                                                        <Icons.RainIcon
                                                            className={cx(
                                                                "icon"
                                                            )}
                                                        />
                                                    )}
                                                    {getWeatherIcon(
                                                        data.temp,
                                                        data.humidity
                                                    ) === "cloud" && (
                                                        <Icons.CloudIcon
                                                            className={cx(
                                                                "icon"
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx("footer")}>
                                        <div className={cx("temp")}>
                                            <span className={cx("min-temp")}>
                                                Low: {data.temp_min}
                                            </span>
                                            <span className={cx("max-temp")}>
                                                High: {data.temp_max}
                                            </span>
                                        </div>
                                        <span
                                            className={cx("current-humidity")}
                                        >
                                            Humidity: {data.humidity}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
