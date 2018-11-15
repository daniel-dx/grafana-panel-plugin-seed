## Daniel Panel Plugin for Grafana

Some information describing your plugin

### Options

- **Msg**:

  Display your message. Default is "hi". 

### Screenshots

![Screenshot of the showcase 1](public/plugins/grafana-daniel-panel/img/screenshot-showcase-1.png)
![Screenshot of the options screen](public/plugins/grafana-daniel-panel/img/screenshot-options.png)

### Development

Using Docker:

1. Clone the repository and `cd` to it
1. Run a local Grafana instance with the development version of the plugin: `docker run -p 3000:3000 -d --name grafana-plugin-dev --volume $(pwd)/dist:/var/lib/grafana/plugins/daniel-panel grafana/grafana`
1. Check the logs to see that Grafana has started up: `docker logs -f grafana-plugin-dev`
1. Start the "dev" task: `npm run dev`
1. Open Grafana at http://localhost:3000/
1. Log in with username "admin" and password "admin"
1. Create new dashboard and add the plugin

#### Changelog

##### v0.0.1

- Description of some features or bug fixed

