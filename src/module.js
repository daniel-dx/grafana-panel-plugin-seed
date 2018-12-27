import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk'; // will be resolved to app/plugins/sdk
import _ from 'lodash';

import './css/panel.base.scss';
// Remove next imports if you don't need separate styles for light and dark themes
import './css/panel.dark.scss';
import './css/panel.light.scss';
// Remove up to here

const panelDefaults = {
  panelConfig: {
    headerBgColor: '',
    headerColor: '',
    headerAlign: 'center',
    borderRadius: '',
    showBorder: true,
    borderColor: '',
    contentBgColor: ''
  }
};

class Ctrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaultsDeep(this.panel, panelDefaults);

    this.debounceRenderGraph = _.debounce(this.renderGraph, 250);
    this.debounceRenderPanel = _.debounce(this.renderPanel, 250);

    this.events.on('render', this.onRender.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
  }

  link(scope, element) {

    this.panelContainerElm = element[0].querySelector('.panel-container');
    this.panelTitleElm = element[0].querySelector('.panel-header');
    this.panelContentElm = element[0].querySelector('.panel-content');
    this.panelGraphElm = element[0].querySelector('.daniel-panel');

    this.initStyles();
    this.debounceRenderPanel();

    // Some large scripts are loaded by dynamic loading
    this.importLargeModules();
  }

  initStyles() {
    window.System.import(this.assetsImportPath + 'css/panel.base.css!');
    // Remove next lines if you don't need separate styles for light and dark themes
    if (grafanaBootData.user.lightTheme) {
      window.System.import(this.assetsImportPath + 'css/panel.light.css!');
    } else {
      window.System.import(this.assetsImportPath + 'css/panel.dark.css!');
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
    this.debounceRenderPanel();
  }

  onDataReceived(data) {
    this.panelData = this.handelPanelData(data);
    this.render();
  }

  /**
   * Render panel
   */
  renderPanel() {
    if (this.panel.panelConfig.contentBgColor)
      this.panelContentElm.style.backgroundColor = this.panel.panelConfig.contentBgColor;
    if (this.panel.panelConfig.headerBgColor)
      this.panelTitleElm.style.backgroundColor = this.panel.panelConfig.headerBgColor;
    if (this.panel.panelConfig.headerColor) {
      this.panelTitleElm.style.color = this.panel.panelConfig.headerColor;
      this.panelTitleElm.style.color = this.panel.panelConfig.headerColor;
    }
    if (this.panel.panelConfig.borderRadius)
      this.panelContainerElm.style.borderRadius = this.panel.panelConfig.borderRadius;
    if (!this.panel.panelConfig.showBorder) {
      this.panelContainerElm.classList.add('no-panel-border');
    } else {
      this.panelContainerElm.classList.remove('no-panel-border');
    }
    if (this.panel.panelConfig.borderColor)
      this.panelContainerElm.style.borderColor = this.panel.panelConfig.borderColor;
    this.panelTitleElm.querySelector('.panel-title').style.justifyContent = this.panel.panelConfig.headerAlign;

    this.panelTitleElm.querySelector('.panel-title').style.padding = '4px 8px'; // 用于让标题居左时有padding
    this.panelContainerElm.style.overflow = 'hidden'; // 用于让borderRadius显示效果生效
  }

  /**
   * The actual method of rendering the chart
   * @param {*} panelData
   */
  renderGraph(panelData) {
    this.panelGraphElm.innerHTML = '';

    // Use this.panelGraphElm to render graphics

    // Notify phantomjs rendering completed in snapshot mode
    setTimeout(() => {
      this.renderingCompleted();
    }, 500)
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
      this._panelPath = `public/plugins/${this.pluginId}/`;
    }
    return this._panelPath;
  }

  get assetsImportPath() {
    if (this._assetsImportPath === undefined) {
      this._assetsImportPath = this.panelPath.replace('public/', '');
    }
    return this._assetsImportPath
  }
}

Ctrl.templateUrl = 'partials/module.html';

export { Ctrl as PanelCtrl };