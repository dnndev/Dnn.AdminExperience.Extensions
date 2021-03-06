import Api from "./api";
import utils from "../utils";
import securityService from "./securityService";
const PageService = function () {

    function getOverridablePagesApi() {
        return new Api(window.dnn.pages.apiController);
    }
    
    function getPagesApi() {
        return new Api("Pages");
    }

    const getPage = function (pageId) {
        const api = getOverridablePagesApi();
        return api.get("GetPageDetails", { pageId })
            .then(response => toFrontEndPage(response));
    };

    const savePage = function (page, hasChangeUrl) {
        const api = getOverridablePagesApi();
        let request = page;
        
        if (page.tabId === 0 && !securityService.isSuperUser()) {
            request = {
                ...page,
                parentId: utils.getCurrentPageId() 
            };
        }
        if (!hasChangeUrl) {
            request = {
                ...request,
                url: ""
            };
        }   

        return api.post("SavePageDetails", toBackEndPage(request));
    };
    
    const deletePage = function (page) {
        const api = getPagesApi();
        return api.post("DeletePage", {id: page.tabId});
    };

    const addPages = function (bulkPage) {
        const api = getOverridablePagesApi();
        return api.post("SaveBulkPages", bulkPage);
    };

    const deletePageModule = function (module) {
        const api = getPagesApi();
        return api.post("DeletePageModule", module);
    };

    const getPageUrlPreview = function (value) {
        const api = getPagesApi();
        return api.get("GetPageUrlPreview", { url: value });
    };

    const getNewPage = function () {
        const api = getOverridablePagesApi();
        return api.get("GetDefaultSettings")
            .then(settings => {
                const page = toFrontEndPage(settings);
                page.tabId = 0;
                page.name = "";
                page.status = "Visible";
                page.localizedName = "";
                page.alias = "";
                page.title = "";
                page.description = "";
                page.keywords = "";
                page.tags = "";
                page.url = "";
                page.externalRedirection = "";
                page.fileRedirection = "";
                page.existingTabRedirection = "";
                page.includeInMenu = true;
                page.allowIndex = true;
                page.thumbnail = "";
                page.created = "";
                page.hierarchy = "";
                page.hasChild = false;
                page.type = 0;
                page.customUrlEnabled = true;
                page.pageType = "normal";
                page.isCopy = false;
                page.startDate = null;
                page.endDate = null;
                page.createdOnDate = new Date();
                page.placeholderURL = "/";
                page.modules = [];
                page.schedulingEnabled = false;
                page.permanentRedirect = false;
                page.linkNewWindow = false;
                page.templateTabId = null;

                return page;
            });
    };

    const getCacheProviderList = function () {
        const api = getPagesApi();
        return api.get("GetCacheProviderList");
    };

    const copyAppearanceToDescendantPages = function (pageId, theme) {
        const api = getPagesApi();
        return api.post("CopyThemeToDescendantPages", {
            pageId, theme
        });
    };

    const copyPermissionsToDescendantPages = function (pageId) {
        const api = getPagesApi();
        return api.post("CopyPermissionsToDescendantPages", {
            pageId
        });
    };
    
    const toFrontEndPage = function (page) {
        return {
            ...page,
            schedulingEnabled: page.startDate || page.endDate 
        };
    }; 

    const toBackEndPage = function (page) {
        return {
            ...page,
            startDate: page.schedulingEnabled ? page.startDate : null,
            endDate: page.schedulingEnabled ? page.endDate : null,
            schedulingEnabled: undefined
        };
    };
    
    const openPageInEditMode = function (id, url) {
        const api = getPagesApi();
        return api.post("EditModeForPage?id=" + id, {})
            .then(() => 
                utils.getUtilities().closePersonaBar(function () {
                    window.top.location.href = url;
                })
            );
    };

    const getCachedPageCount = function (cacheProvider, pageId) {
        const api = getPagesApi();
        return api.get("GetCachedItemCount", { cacheProvider: cacheProvider, tabId: pageId });
    };

    const clearCache = function (cacheProvider, pageId) {
        const api = getPagesApi();
        return api.post("ClearCache?cacheProvider=" + cacheProvider + "&tabId=" + pageId);
    };

    return {
        getPage,
        savePage,
        deletePage,
        addPages,
        getNewPage,
        getCacheProviderList,
        deletePageModule,
        getPageUrlPreview,
        copyAppearanceToDescendantPages,
        copyPermissionsToDescendantPages,
        openPageInEditMode,
        getCachedPageCount,
        clearCache
    };
};

const pageService = PageService();
export default pageService;
