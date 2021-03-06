import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
    siteBehavior as SiteBehaviorActions
} from "../../actions";
import InputGroup from "dnn-input-group";
import MultiLineInputWithError from "dnn-multi-line-input-with-error";
import PagePicker from "dnn-page-picker";
import Grid from "dnn-grid-system";
import Label from "dnn-label";
import Button from "dnn-button";
import "./style.less";
import util from "../../utils";
import resx from "../../resources";
import styles from "./style.less";

let isHost = false;

class DefaultPagesSettingsPanelBody extends Component {
    constructor() {
        super();
        this.state = {
            defaultPagesSettings: undefined,
            resetPagePicker: false
        };
        isHost = util.settings.isHost;
    }

    loadData() {
        const {props} = this;
        if (props.defaultPagesSettings) {
            let portalIdChanged = false;
            let cultureCodeChanged = false;

            if (props.portalId === undefined || props.defaultPagesSettings.PortalId === props.portalId) {
                portalIdChanged = false;
            }
            else {
                portalIdChanged = true;
            }

            if (props.cultureCode === undefined || props.defaultPagesSettings.CultureCode === props.cultureCode) {
                cultureCodeChanged = false;
            }
            else {
                cultureCodeChanged = true;
            }

            if (portalIdChanged || cultureCodeChanged) {
                return true;
            }
            else return false;
        }
        else {
            return true;
        }
    }

    componentWillMount() {
        const {props} = this;
        if (!this.loadData()) {
            this.setState({
                defaultPagesSettings: props.defaultPagesSettings
            });
            return;
        }
        props.dispatch(SiteBehaviorActions.getDefaultPagesSettings(props.portalId, props.cultureCode, (data) => {
            this.setState({
                defaultPagesSettings: Object.assign({}, data.Settings)
            });
        }));
    }

    componentWillReceiveProps(props) {
        this.setState({
            defaultPagesSettings: Object.assign({}, props.defaultPagesSettings)
        });
    }

    onSettingChange(key, event) {
        let {state, props} = this;
        if (state.resetPagePicker) {
            return;
        }

        let defaultPagesSettings = Object.assign({}, state.defaultPagesSettings);

        if (key === "SplashTabId" || key === "HomeTabId" || key === "LoginTabId" || key === "RegisterTabId" ||
            key === "UserTabId" || key === "SearchTabId" || key === "Custom404TabId" || key === "Custom500TabId") {
            if (defaultPagesSettings[key] !== parseInt(event)) {
                defaultPagesSettings[key] = event;
            }
            else {
                return;
            }
        }
        else {
            defaultPagesSettings[key] = typeof (event) === "object" ? event.target.value : event;
        }

        this.setState({
            defaultPagesSettings: defaultPagesSettings
        });

        props.dispatch(SiteBehaviorActions.defaultPagesSettingsClientModified(defaultPagesSettings));
    }

    onUpdate(event) {
        event.preventDefault();
        const {props, state} = this;

        props.dispatch(SiteBehaviorActions.updateDefaultPagesSettings(state.defaultPagesSettings, () => {
            util.utilities.notify(resx.get("SettingsUpdateSuccess"));
        }, () => {
            util.utilities.notifyError(resx.get("SettingsError"));
        }));
    }

    onCancel() {
        const {props} = this;
        util.utilities.confirm(resx.get("SettingsRestoreWarning"), resx.get("Yes"), resx.get("No"), () => {
            props.dispatch(SiteBehaviorActions.getDefaultPagesSettings(props.portalId, props.cultureCode, (data) => {
                let defaultPagesSettings = Object.assign({}, data.Settings);
                this.setState({
                    defaultPagesSettings
                }, () => {
                    this.setState({
                        resetPagePicker: true
                    }, () => {
                        this.setState({ resetPagePicker: false });
                    });
                });
            }));
        });
    }

    /* eslint-disable react/no-danger */
    render() {
        const {props, state} = this;
        const noneSpecifiedText = "<" + resx.get("NoneSpecified") + ">";
        const TabParameters = {
            portalId: props.portalId !== undefined ? props.portalId : -2,
            cultureCode: "",
            isMultiLanguage: false,
            excludeAdminTabs: false,
            roles: "",
            sortOrder: 0
        };
        let TabParameters_1 = Object.assign(Object.assign({}, TabParameters), { disabledNotSelectable: false });
        let TabParameters_2 = Object.assign(Object.assign({}, TabParameters), { disabledNotSelectable: true });
        let TabParameters_Login = Object.assign(Object.assign({}, TabParameters), { disabledNotSelectable: false, validateTab: "Account Login" });
        let TabParameters_Search = Object.assign(Object.assign({}, TabParameters), { disabledNotSelectable: false, validateTab: "Search Results" });
        if (state.defaultPagesSettings) {
            const columnOne = <div className="left-column">
                <InputGroup>
                    <Label
                        tooltipMessage={resx.get("plSplashTabId.Help")}
                        label={resx.get("plSplashTabId")}
                        />
                    <PagePicker
                        serviceFramework={util.utilities.sf}
                        style={{ width: "100%", zIndex: 5 }}
                        selectedTabId={state.defaultPagesSettings.SplashTabId}
                        OnSelect={this.onSettingChange.bind(this, "SplashTabId")}
                        defaultLabel={state.defaultPagesSettings.SplashTabName !== "" ? state.defaultPagesSettings.SplashTabName : noneSpecifiedText}
                        noneSpecifiedText={noneSpecifiedText}
                        CountText={"{0} Results"}
                        PortalTabsParameters={TabParameters_1}
                        ResetSelected={state.resetPagePicker}
                        />
                </InputGroup>
                <InputGroup>
                    <Label
                        tooltipMessage={resx.get("plHomeTabId.Help")}
                        label={resx.get("plHomeTabId")}
                        />
                    <PagePicker
                        serviceFramework={util.utilities.sf}
                        style={{ width: "100%", zIndex: 4 }}
                        selectedTabId={state.defaultPagesSettings.HomeTabId}
                        OnSelect={this.onSettingChange.bind(this, "HomeTabId")}
                        defaultLabel={state.defaultPagesSettings.HomeTabName !== "" ? state.defaultPagesSettings.HomeTabName : noneSpecifiedText}
                        noneSpecifiedText={noneSpecifiedText}
                        CountText={"{0} Results"}
                        PortalTabsParameters={TabParameters_1}
                        ResetSelected={state.resetPagePicker}
                        />
                </InputGroup>
                <InputGroup>
                    <Label
                        tooltipMessage={resx.get("plLoginTabId.Help")}
                        label={resx.get("plLoginTabId")}
                        />
                    <PagePicker
                        serviceFramework={util.utilities.sf}
                        style={{ width: "100%", zIndex: 3 }}
                        selectedTabId={state.defaultPagesSettings.LoginTabId}
                        OnSelect={this.onSettingChange.bind(this, "LoginTabId")}
                        defaultLabel={state.defaultPagesSettings.LoginTabName !== "" ? state.defaultPagesSettings.LoginTabName : noneSpecifiedText}
                        noneSpecifiedText={noneSpecifiedText}
                        CountText={"{0} Results"}
                        PortalTabsParameters={TabParameters_Login}
                        ResetSelected={state.resetPagePicker}
                        />
                </InputGroup>
                <InputGroup>
                    <Label
                        tooltipMessage={resx.get("plRegisterTabId.Help")}
                        label={resx.get("plRegisterTabId")}
                        />
                    <PagePicker
                        serviceFramework={util.utilities.sf}
                        style={{ width: "100%", zIndex: 2 }}
                        selectedTabId={state.defaultPagesSettings.RegisterTabId}
                        OnSelect={this.onSettingChange.bind(this, "RegisterTabId")}
                        defaultLabel={state.defaultPagesSettings.RegisterTabName !== "" ? state.defaultPagesSettings.RegisterTabName : noneSpecifiedText}
                        noneSpecifiedText={noneSpecifiedText}
                        CountText={"{0} Results"}
                        PortalTabsParameters={TabParameters_1}
                        ResetSelected={state.resetPagePicker}
                        />
                </InputGroup>
            </div>;
            const columnTwo = <div className="right-column">
                <InputGroup>
                    <Label
                        tooltipMessage={resx.get("plUserTabId.Help")}
                        label={resx.get("plUserTabId")}
                        />
                    <PagePicker
                        serviceFramework={util.utilities.sf}
                        style={{ width: "100%", zIndex: 5 }}
                        selectedTabId={state.defaultPagesSettings.UserTabId}
                        OnSelect={this.onSettingChange.bind(this, "UserTabId")}
                        defaultLabel={state.defaultPagesSettings.UserTabName !== "" ? state.defaultPagesSettings.UserTabName : noneSpecifiedText}
                        noneSpecifiedText={noneSpecifiedText}
                        CountText={"{0} Results"}
                        PortalTabsParameters={TabParameters_1}
                        ResetSelected={state.resetPagePicker}
                        />
                </InputGroup>
                <InputGroup>
                    <Label
                        tooltipMessage={resx.get("plSearchTabId.Help")}
                        label={resx.get("plSearchTabId")}
                        />
                    <PagePicker
                        serviceFramework={util.utilities.sf}
                        style={{ width: "100%", zIndex: 4 }}
                        selectedTabId={state.defaultPagesSettings.SearchTabId}
                        OnSelect={this.onSettingChange.bind(this, "SearchTabId")}
                        defaultLabel={state.defaultPagesSettings.SearchTabName !== "" ? state.defaultPagesSettings.SearchTabName : noneSpecifiedText}
                        noneSpecifiedText={noneSpecifiedText}
                        CountText={"{0} Results"}
                        PortalTabsParameters={TabParameters_Search}
                        ResetSelected={state.resetPagePicker}
                        />
                </InputGroup>
                <InputGroup>
                    <Label
                        tooltipMessage={resx.get("pl404TabId.Help")}
                        label={resx.get("pl404TabId")}
                        />
                    <PagePicker
                        serviceFramework={util.utilities.sf}
                        style={{ width: "100%", zIndex: 3 }}
                        selectedTabId={state.defaultPagesSettings.Custom404TabId}
                        OnSelect={this.onSettingChange.bind(this, "Custom404TabId")}
                        defaultLabel={state.defaultPagesSettings.Custom404TabName !== "" ? state.defaultPagesSettings.Custom404TabName : noneSpecifiedText}
                        noneSpecifiedText={noneSpecifiedText}
                        CountText={"{0} Results"}
                        PortalTabsParameters={TabParameters_2}
                        ResetSelected={state.resetPagePicker}
                        />
                </InputGroup>
                <InputGroup>
                    <Label
                        tooltipMessage={resx.get("pl500TabId.Help")}
                        label={resx.get("pl500TabId")}
                        />
                    <PagePicker
                        serviceFramework={util.utilities.sf}
                        style={{ width: "100%", zIndex: 2 }}
                        selectedTabId={state.defaultPagesSettings.Custom500TabId}
                        OnSelect={this.onSettingChange.bind(this, "Custom500TabId")}
                        defaultLabel={state.defaultPagesSettings.Custom500TabName !== "" ? state.defaultPagesSettings.Custom500TabName : noneSpecifiedText}
                        noneSpecifiedText={noneSpecifiedText}
                        CountText={"{0} Results"}
                        PortalTabsParameters={TabParameters_2}
                        ResetSelected={state.resetPagePicker}
                        />
                </InputGroup>
            </div>;

            return (
                <div className={styles.defaultPagesSettings}>
                    <Grid children={[columnOne, columnTwo]} numberOfColumns={2} />
                    {isHost &&
                        <div className="sectionTitle">{resx.get("PageOutputSettings")}</div>}
                    {isHost &&
                        <InputGroup style={{ paddingTop: "10px" }}>
                            <Label
                                tooltipMessage={resx.get("plPageHeadText.Help")}
                                label={resx.get("plPageHeadText")}
                                />
                            <MultiLineInputWithError
                                value={state.defaultPagesSettings.PageHeadText}
                                onChange={this.onSettingChange.bind(this, "PageHeadText")}
                                />
                        </InputGroup>
                    }

                    <div className="buttons-box">
                        <Button
                            disabled={!this.props.defaultPagesSettingsClientModified}
                            type="secondary"
                            onClick={this.onCancel.bind(this)}>
                            {resx.get("Cancel")}
                        </Button>
                        <Button
                            disabled={!this.props.defaultPagesSettingsClientModified}
                            type="primary"
                            onClick={this.onUpdate.bind(this)}>
                            {resx.get("Save")}
                        </Button>
                    </div>
                </div>
            );
        }
        else return <div />;
    }
}

DefaultPagesSettingsPanelBody.propTypes = {
    dispatch: PropTypes.func.isRequired,
    tabIndex: PropTypes.number,
    defaultPagesSettings: PropTypes.object,
    defaultPagesSettingsClientModified: PropTypes.bool,
    portalId: PropTypes.number,
    cultureCode: PropTypes.string
};

function mapStateToProps(state) {
    return {
        tabIndex: state.pagination.tabIndex,
        defaultPagesSettings: state.siteBehavior.defaultPagesSettings,
        defaultPagesSettingsClientModified: state.siteBehavior.defaultPagesSettingsClientModified
    };
}

export default connect(mapStateToProps)(DefaultPagesSettingsPanelBody);