sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
	],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("projverrun.controller.main", {
            onInit: function () {
                var oViewModel,
				iOriginalBusyDelay,
				oTable = this.byId("table")
                iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
                // keeps the search state
			this._aTableSearchState = [];
            // Model used to manipulate control states
			   oViewModel = new JSONModel({
				worklistTableTitle: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("worklistTableTitle"),
			//	shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
			//	shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
			//	shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
			//	tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 1
			});
			this.getOwnerComponent().setModel(oViewModel, "worklistView");
            oTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for worklist's table
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});
			oTable.setBusy(false);
		},
            onPress: function (oEvent) {
                var cbox = this.getView().byId("verlistc");
                var version = cbox.getSelectedKey();
                var ver_text = cbox._getSelectedItemText();
                if (version == "") {
                    alert("Select version to process");
                    /*    {
                            var msg = new sap.m.MessageStrip("id", {
                                link: new sap.m.Link("linkid", {
                                    text: "EnterSelect Version"
                                    //press: this.onClick
                                })
                            });
                        this.getView().byId("form").addContent(msg);
                        } */
                } else {
                    var verData = {
                        "ProcessedBy": "",
                        "VersionName": version,
                        "VersionDescr": ver_text,
                        "Status": ""
                    };
                    var service_uri = "/sap/opu/odata/sap/ZTEST_PROJECT_SRV/";
                    var oModel = new sap.ui.model.odata.ODataModel(service_uri);
                    oModel.create("/version_listSet", verData, null, function (oData, oResponse) {
                        alert("Sucess:Type1 Quotations are scehduled to create in background");
                        location.reload();
                     // sap.ui.getCore().byId("verlisti").getModel().refresh(true);
                    },
                        function (err) {//Error Callback
                            alert("Error:Some thing went wrong");
                        });
                }

            },
            //Batch request – set busy true
            onUsageTypeRequested: function (oEvent) {
                sap.ui.core.BusyIndicator.show();
            },
            //Batch response – set busy false
            onUsageTypeReceived: function (oEvent) {
                sap.ui.core.BusyIndicator.hide();
            }
        });
    });
