import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk'; // will be resolved to app/plugins/sdk
import _ from 'lodash';

import './css/panel.base.scss';
// Remove next imports if you don't need separate styles for light and dark themes
import './css/panel.dark.scss';
import './css/panel.light.scss';
// Remove up to here

const panelDefaults = {
  msg: 'hi'
};

class Ctrl extends MetricsPanelCtrl {
  constructor($scope, $injector, $element) {
    super($scope, $injector);
    _.defaultsDeep(this.panel, panelDefaults);

    this.$element = $element;

    this.debounceRenderGraph = _.debounce(this.renderGraph, 250);

    this.events.on('render', this.onRender.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
  }

  link(scope, element) {
    this.initStyles();

    // Some large scripts are loaded by dynamic loading
    this.importLargeModules();
  }

  initStyles() {
    window.System.import(this.panelPath + 'css/panel.base.css!');
    // Remove next lines if you don't need separate styles for light and dark themes
    if (grafanaBootData.user.lightTheme) {
      window.System.import(this.panelPath + 'css/panel.light.css!');
    } else {
      window.System.import(this.panelPath + 'css/panel.dark.css!');
    }
    // Remove up to here
  }

  importLargeModules() {
  }

  onInitEditMode() {
    this.addEditorTab('Options', this.panelPath + 'partials/editor.html', 2);
  }

  onRender() {
    if (this.panelData) this.debounceRenderGraph(this.panelData);
  }

  onDataReceived(data) {
    this.panelData = this.handelPanelData(data);
    this.render();
  }

  /**
   * The actual method of rendering the chart
   * @param {*} panelData
   */
  renderGraph(panelData) {
    let containerElm = this.$element[0].querySelector('.daniel-panel');
    containerElm.innerHTML = '';

    // Use containerElm to render graphics
    containerElm.innerHTML = this.panel.msg;
  }

  /**
   * Processed into the required data format
   * @param {*} panelData
   */
  handelPanelData(data) {
    let result = data;
    return result;
  }

  get panelPath() {
    if (this._panelPath === undefined) {
      this._panelPath = `/public/plugins/${this.pluginId}/`;
    }
    return this._panelPath;
  }
}

Ctrl.templateUrl = 'partials/module.html';

export { Ctrl as PanelCtrl };