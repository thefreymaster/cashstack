app.controller('AccountValueController', function (dataTransferService, appDataService, mediaService) {
    var controller = this;
    this.hero;
    controller.service = appDataService;
    controller.dataTransferService = dataTransferService;

    controller.mediaService = mediaService;
        if(controller.mediaService.screenIsExtraSmall == true)
                {
                        controller.dataTransferService.optionsLine = {
                                animation: {
                                duration: 3000,
                                easing: 'easeInOutSine'
                        },
                        legend: {display: false},
                        elements: {
                                point: {
                                        radius: 0
                                },
                                line : { tension : 0 }
                        }


                };
        }
        else
        {
                controller.dataTransferService.optionsLine = {
                                animation: {
                                duration: 3000,
                                easing: 'easeInOutSine'
                        },
                        legend: {display: false},
                        elements: {
                                point: {
                                        radius: 0
                                },
                                line : { tension : 0 }
                        }

                };
        }

        controller.countUpDollar = {
          useEasing : true, 
          useGrouping : true, 
          separator : ',', 
          decimal : '.', 
          prefix : '$', 
        };
});