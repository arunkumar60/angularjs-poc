
app.controller('homeController', function ($scope,cartService,$rootScope) {

    //I like to have an init() for controllers that need to perform some initialization. 
    // Keeps things in one place
    init();

    function init() {
    	$scope.itemDetails = cartService.getProducts();
    	$scope.itemLength = $scope.itemDetails.length;
    	$rootScope.editHideShow = false;
    };
     $scope.editClick = function(p_selected){
     	$rootScope.editHideShow = true;
    	$rootScope.mask = 'mask-enable';
    	$rootScope.$emit("EditPageDetails", p_selected);
    };
    $rootScope.$on("EditItemDetails", function(event,editItem){
        console.log("editItem",editItem);
        var p_id_edit = editItem[0].itemToEdit.p_id;
        var indexOfEditItem = -1;
        var size = editItem[0].sizeEdit;
        angular.forEach($scope.itemDetails, function(value, index) {
            if(p_id_edit == value.p_id){
                indexOfEditItem = index;
            }
        });
        if(size == "small"){
            size = "s" ;
        }else if(size == "medium"){
             size = "m"
        }else if(size == "large"){
            size = "l" ;
        }else{
            size = "xl" ;
        }
        $scope.itemDetails[indexOfEditItem].p_selected_size.code = size;
        $rootScope.editHideShow = false;
        $rootScope.initSize = "Select";
    });

});

