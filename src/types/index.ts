export interface WeatherData {
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
    clouds: {
      all: number;
    };
  }
  
  export interface User {
    id: number;
    name: string;
  }
  
  export interface Favorite {
    id: number;
    location: string;
    userId: number;
  }
  
