// 서브 클릭시 상세 카테고리 가져오기
$(function() { // $(function() 는 웹에서 모든 DOM을 불러오고 맨 마지막에 실행
    var pmcIdx = $("#first_pmcIdx").val();
   // console.log(" JS first Main Category Idx : "+pmcIdx );
    
    get_sub_category(pmcIdx); // 서브 카테고리를 검색    
});

// 서브카테고리 클릭시에 상세 관리 카테고리 가져오기 프로세스
$(document).on("click", ".pro-depth-2 li", function(){
    $(".pro-depth-2 li").removeClass("active");
    $(this).addClass("active");

    console.log("Sub Category Click eVent");

    // 상세 카테고리 정보 
    var pscIdx = $(this).find("#psclistIdx").val();
    var pscName = $(this).find("#pscName").val();
    var pscClickedId = $(this).attr('id');
    var idLength = pscClickedId.length;
    var pscClickedNo = pscClickedId.substr(7, idLength) -1;

    console.log("PSC Clicked Id : " + pscClickedId);
    console.log("Length of Id : " + idLength);
    console.log("PSC Clicked No : " + pscClickedNo);

    $("#pscCur").val(pscClickedNo);
    $("#pscListTitle").text(pscName);
    $(".help-block").empty();
    
    // Ajax 로 관리카테고리 별 상세 카테고리 가져오기
    // let formData = new FormData();
    // formData.append("subIdx", subIdx);

    get_detail_category(pscIdx);    
    
});

// 서브관리 카테고리 정보 가져오기
function get_sub_category(pmcIdx) {
    // Ajax 로 서브 카테고리 리스트 가져오기

    //console.log("PMC ID in get_sub_category function : "+pmcIdx);

    let formData = new FormData();
    formData.append("pmcIdx", pmcIdx);

    $.ajax({
        url : "/dotsAdmin/_inc/_getSubCategory.php",
        data : formData,
        enctype: "multipart/form-data",
        processData : false,
        contentType : false,
        type : "POST",
        success : function(response){
            let json = JSON.parse(response);
            if(json.result == "success"){
                //console.log(json.pscCategory);
                $(".pro-depth-2").empty();    
                $(".pro-depth-2").append(json.pscCategory);

                var checkIndex = $("#pscCur").val();
                
                if(checkIndex==""){
                   $(".pro-depth-2 li:first-child").trigger("click");  
                }else{
                    $(".pro-depth-2 li").eq(checkIndex).trigger("click");  
                }
                
            } else if(json.result == "error"){
                //alert(json.resultMsg);
                $(".pro-depth-2").empty(); 
                $(".pro-depth-2").append(json.resultMsg);
                return;
            }
        },
        error : function(response) {
        }
    });
}

function pscCancel(){

    $(".subCategory form")[0].reset();
    //$(".subCategory .col-tit").text("서브카테고리명 입력");
    //$(".subCategory #Mode").val("Insert");
    window.location.href = "pMainCategoryL.php";
}

// 서브 관리카테고리 수정 소스
function pscModify(pscIdx){
    $("#pscPopup, .col-popup-bg").fadeIn();
	$("#pdcPopup .col-tit").text("서브 카테고리 수정");
    $("#pdcPopup #Mode").val("Modify");
    $("#pdcPopup #pscIdx").val(pscIdx);
	$(".current-file").show();


    // 수정 From 서브 카테고리 Idx 값을 전달
    document.getElementById("pscIdx").value = pscIdx;

    // Ajax로 서브카테고리 내용 가져오기
    let formData = new FormData();
    formData.append("pscIdx", pscIdx);

    $.ajax({
        url : "/dotsAdmin/_inc/_getSubCategoryRow.php",
        data : formData,
        enctype: "multipart/form-data",
        processData : false,
        contentType : false,
        type : "POST",
        success : function(response){
            let json = JSON.parse(response);
            if(json.result == "success"){
                //console.log(json.activeStatus);
                
                //window.location.reload();
                //$("#update_dk_psc_kr").val(json.subCategoryKr);
                document.getElementById("update_dk_psc_name_kr").value = json.pscCategoryKr;
                document.getElementById("update_dk_psc_name_en").value = json.pscCategoryEn;
                document.getElementById("update_dk_psc_name_cn").value = json.pscCategoryCn;
                document.getElementById("update_dk_psc_name_jp").value = json.pscCategoryJp;
                document.getElementById("update_dk_psc_ti_file").value = json.dk_psc_ti_file;
                document.getElementById("update_dk_psc_product_pagelink").value = json.dk_psc_product_pagelink;
                $("#dk_psc_current_image").text(json.pscImagepdsFilename);
				$("#dk_psc_current_image").attr("href","/Upload/Products/"+json.pscImagePdsFile);
                //document.getElementById("update_dk_active_status").value = json.activeStatus;

                
                // 여기서 이미지 파일에 대한 값을 Html로 돌려 주는 방법을 찾아함.
                if (json.activeStatus == "Y") {
                    $("#update_dk_psc_active_status_y").prop("checked", true);
                }else{
                    $("#update_dk_psc_active_status_n").prop("checked", true);
                }

            } else if(json.result == "error"){
                alert(json.resultMsg);
                // $("#manager_branch_id").parent().find($(".help-block")).text("소속 지점 관리자가 존재합니다.");
                // $('#manager_branch_id').parent().find($(".help-block")).addClass('red');
                // $('#tag').focus();
                return;
            }
        },
        error : function(response) {
        }
    });

}

// @@ 서브 카테고리 삭제 START
function pscDelete(pscIdx, loopCnt) {
    // 정말삭제하시겠습니까 ? 
    var message = "정말 삭제하시겠습니까 ? 22";
	var index = confirm(message);

    if(index) {
        let formData = new FormData();
        formData.append("Mode", "Delete");
        formData.append("regMode", "pscRegi");
        formData.append("pscIdx", pscIdx);
        
        $.ajax({
            url : "pSubCategoryP.php",
            data : formData,
            enctype: "multipart/form-data",
            processData : false,
            contentType : false,
            type : "POST",
            success : function(response){
                let json = JSON.parse(response);
                if(json.result == "success"){
                    alert(json.resultMsg);
                    window.location.reload();								
                } else if(json.result == "error"){
                    alert(json.resultMsg);
                    //console.log(loopCnt);
                    $(".help-block").empty();
                    $("#subList"+loopCnt).next(".help-block").text(json.resultMsg);
                    $('#subList'+loopCnt).next(".help-block").addClass('red');
                    $('#tag').focus();
                }
            },
            error : function(response) {
                alert(json.resultMsg);
            }
        });
    }
}

// 서브 카테고리 등록 버튼 클릭시 프로세스
$(function() {
            
    isAjaxing = true;
    $("#goPscSubmit").on("click", function(e) {

        if($("#dk_psc_kr").val() == "") {
            alert("서브 카테고리 국문명을 입력해 주시기 바랍니다.");
            $("#dk_psc_kr").parent().find($(".help-block")).text("카테고리 국문명을 입력해 주시기 바랍니다.");
            $('#dk_psc_kr').parent().find($(".help-block")).addClass('red');
            $('#dk_psc_kr').focus();
            return;
        } else {
            $('#dk_psc_kr').parent().find($(".help-block")).removeClass('red');
        }


        if($("#dk_psc_en").val() == "") {
            alert("카테고리 영문명을 입력해 주시기 바랍니다.");
            $("#dk_psc_en").parent().parent().parent().find($(".help-block")).text("카테고리 영문명을 입력해 주시기 바랍니다.");
            $('#dk_psc_en').parent().parent().parent().find($(".help-block")).addClass('red');
            $('#dk_psc_en').focus();
            return;
        } else {
            $('#dk_psc_en').parent().parent().parent().find($(".help-block")).removeClass('red');
        }

        $('#frmPsc').ajaxForm({
            url: "pSubCategoryP.php",
            enctype: "multipart/form-data",
            success: function(response){
                let json = JSON.parse(response);
                if(json.result == "success") {
                    isAjaxing = false;
                    alert(json.resultMsg);	
                    window.location.reload();                    
                } else {
                    isAjaxing = false;
                    alert(json.resultMsg);
                    return;
                }
            },
            error: function(request, status, error) {
                isAjaxing = false;
                alert(error);
            }
        });			

        $("#frmPsc").submit();
    });

    // 서브 카테고리 정보 수정 버트 클릭시 프로세스
    $("#goPscUpdateSubmit").on("click", function(e) {

       // console.log("서브 카테고리 수정");

        if($("#update_dk_psc_kr").val() == "") {
            alert("서브 카테고리 국문명을 입력해 주시기 바랍니다.");
            $("#update_dk_psc_kr").parent().find($(".help-block")).text("서브 카테고리 국문명을 입력해 주시기 바랍니다.");
            $('#update_dk_psc_kr').parent().find($(".help-block")).addClass('red');
            $('#update_dk_psc_kr').focus();
            return;
        } else {
            $('#update_dk_psc_kr').parent().find($(".help-block")).removeClass('red');
        }


        if($("#update_dk_psc_en").val() == "") {
            alert("서브 카테고리 영문명을 입력해 주시기 바랍니다.");
            $("#update_dk_psc_en").parent().find($(".help-block")).text("서브 카테고리 영문명을 입력해 주시기 바랍니다.");
            $('#update_dk_psc_en').parent().find($(".help-block")).addClass('red');
            $('#update_dk_psc_en').focus();
            return;
        } else {
            $('#update_dk_psc_en').parent().find($(".help-block")).removeClass('red');
        }


        $('#frmPscUpdate').ajaxForm({
            url: "pSubCategoryP.php",
            enctype: "multipart/form-data",
            success: function(response){
                let json = JSON.parse(response);
                if(json.result == "success") {
                    isAjaxing = false;
                   // console.log(json.resultMsg);
                    alert(json.resultMsg);	
                    $("#pscPopup, .col-popup-bg").fadeOut();

                    get_sub_category(json.masterIdx);

                    var pscCur = $("#pscCur").val();
                    //console.log(pscCur);

                } else {
                    isAjaxing = false;
                    alert(json.resultMsg);
                    return;
                }
            },
            error: function(request, status, error) {
                isAjaxing = false;
                alert(error);
            }
        });			

         $("#frmPscUpdate").submit();
    });    
});

// 상세 카테고리 클릭 - 제품 카테고리 정보 가져오기
$(document).on("click", ".pro-depth-3 li", function(){
    $(".pro-depth-3 li").removeClass("active");
    $(this).addClass("active");

    var pdcIdx = $(this).find("#pdcListIdx").val();
    var pdcClickedId = $(this).attr('id');
    var idLength = pdcClickedId.length;
    //console.log("Detail List Length : " + idLength);
    var pdcClickedNo = pdcClickedId.substr(7, idLength) -1;

    //console.log("Detail Click NO : " + detailClickedNo);
    //console.log("Click Detail Program : " + pdcIdx);

    $("#pdcCur").val(pdcClickedNo);
    $(".help-block").empty();  
    
    get_product_category(pdcIdx);
});

// 상세관리 카테고리 정보 가져오기 Ajax
function get_detail_category(pscIdx) {

    let formData = new FormData();
    formData.append("pscIdx", pscIdx);

    //console.log("Get PCS Idx : "+pscIdx);

    // Ajax 로 관리카테고리 별 상세 카테고리 가져오기
    $.ajax({
        url : "/dotsAdmin/_inc/_getDetailCategory.php",
        data : formData,
        enctype: "multipart/form-data",
        processData : false,
        contentType : false,
        type : "POST",
        success : function(response){
            let json = JSON.parse(response);
            if(json.result == "success"){
                //console.log(json.detailProgram);
                $(".pro-depth-3").empty();    
                $(".pro-depth-4").empty();    
                $(".pro-depth-3").append(json.pdcCategory);

                var checkIndex = $("#pdcCur").val();
                
                if(checkIndex==""){
                   $(".pro-depth-3 li:first-child").trigger("click");  
                }else{
                    $(".pro-depth-3 li").eq(checkIndex).trigger("click");  
                }
                
            } else if(json.result == "error"){
                //alert(json.resultMsg);
                $(".pro-depth-3").empty(); 
                $(".pro-depth-3").append(json.resultMsg);
                return;
            }
        },
        error : function(response) {
        }
    });
}

// @@ 서브카테고리 등록 START
function pscRegi(){
    $("#subCategory, .col-popup-bg").fadeIn();
}
// @@ 서브카테고리 닫기 START
function 서브카테고리닫기(){
	 $(".col.col-popup, .col-popup-bg").fadeOut();
}

// @@ 상세카테고리 등록 START
function pdcReg(subCategoryName, pmcIdx, pscIdx){
    var detailTitle = subCategoryName +" - 상세카테고리 입력";
    $("#pdcPopup, .col-popup-bg").fadeIn();
    $("#pdcPopup #Mode").val("Insert");
    $("#pdcPopup #pmcIdx").val(pmcIdx);
    $("#pdcPopup #pscIdx").val(pscIdx);
    $("#pdcPopup .col-tit").text(subCategoryName);
	$(".current-file").hide();

    $("#dk_pdc_insert_image_pdsFile").val("");
    $("#dk_pdc_name_kr").val("");
    $("#dk_pdc_name_en").val("");
    $("#dk_pdc_name_jp").val("");
    $("#dk_pdc_name_cn").val("");
    $("#dk_pdc_ti_file").val("");
    $("#dk_pdc_product_pagelink").val("");
}

// @@ 상세카테고리 수정 START
function pdcModify(pdcIdx){
    $("#pdcPopup, .col-popup-bg").fadeIn();
    $("#pdcPopup .col-tit").text("상세카테고리명 수정");
    $("#pdcPopup #Mode").val("Modify");
    $("#pdcPopup #pdcIdx").val(pdcIdx);
	$(".current-file").show();

    //alert("상세수정");

    // Ajax로 서브카테고리 내용 가져오기
    let formData = new FormData();
    formData.append("pdcIdx", pdcIdx);

    $.ajax({
        url : "/dotsAdmin/_inc/_getDetailRow.php",
        data : formData,
        enctype: "multipart/form-data",
        processData : false,
        contentType : false,
        type : "POST",
        success : function(response){
            let json = JSON.parse(response);
            if(json.result == "success"){
                //console.log("Modify Detail : "+json.subIdx);
                document.getElementById("pscIdx").value = json.subIdx;
                document.getElementById("dk_pdc_name_kr").value = json.detailProgramKr;
                document.getElementById("dk_pdc_name_en").value = json.detailProgramEn;
                document.getElementById("dk_pdc_name_cn").value = json.detailProgramCn;
                document.getElementById("dk_pdc_name_jp").value = json.detailProgramJp;
                document.getElementById("dk_pdc_ti_file").value = json.dk_pdc_ti_file;
                document.getElementById("dk_pdc_product_pagelink").value = json.dk_pdc_product_pagelink;
                $("#dk_pdc_current_image").text(json.pdcImagepdsFilename);
				$("#dk_pdc_current_image").attr("href","/Upload/Products/"+json.pdcImagePdsFile);

//                get_detail_category(json.subIdx);

                var pscCur = $("#pscCur").val();

            } else if(json.result == "error"){
                alert(json.resultMsg);
                $("#manager_branch_id").parent().find($(".help-block")).text("소속 지점 관리자가 존재합니다.");
                $('#manager_branch_id').parent().find($(".help-block")).addClass('red');
                $('#tag').focus();
                return;
            }
        },
        error : function(response) {
        }
    });
}

// @@ 상세카테고리 삭제 START
function pdcDelete(pdcIdx, subIdx) {
 
    // 정말삭제하시겠습니까 ? 
    var message = "정말 삭제하시겠습니까 ?2";
    var index = confirm(message);

    console.log("pdxIdx in Delete : "+pdcIdx);

    if(index) {
        let formData = new FormData();
        formData.append("Mode", "Delete");
        formData.append("regMode", "pdcRegi");
        formData.append("pscIdx", pscIdx);
        formData.append("pdcIdx", pdcIdx);
        
        $.ajax({
            url : "pSubCategoryP.php",
            data : formData,
            enctype: "multipart/form-data",
            processData : false,
            contentType : false,
            type : "POST",
            success : function(response){
                let json = JSON.parse(response);
                if(json.result == "success"){
                    alert(json.resultMsg);
                    get_detail_category(subIdx);
                    
                } else if(json.result == "error"){
                    alert(json.resultMsg);
                }
            },
            error : function(response) {
                alert(json.resultMsg);
            }
        });
    }
}

// @@ 상세카테고리 팝업 닫기 START
function pdcClose(){
    $(".col.col-popup, .col-popup-bg").fadeOut();
}


// 상세 카테고리 카테고리 등록
$(function() {
            
    isAjaxing = true;
    $("#goPdcSubmit").on("click", function(e) {

        if($("#dk_pdc_name_kr").val() == "") {
            alert("상세 관리 카테고리 국문명을 입력해 주시기 바랍니다.");
            $("#dk_pdc_name_kr").parent().find($(".help-block")).text("상세 관리 카테고리 국문명을 입력해 주시기 바랍니다.");
            $('#dk_pdc_name_kr').parent().find($(".help-block")).addClass('red');
            $('#dk_pdc_name_kr').focus();
            return;
        } else {
            $('#dk_pdc_name_kr').parent().find($(".help-block")).removeClass('red');
        }


        if($("#dk_pdc_name_en").val() == "") {
            alert("상세 관리카테고리 영문명을 입력해 주시기 바랍니다.");
            $("#dk_pdc_name_en").parent().find($(".help-block")).text("상세 관리카테고리 영문명을 입력해 주시기 바랍니다.");
            $('#dk_pdc_name_en').parent().find($(".help-block")).addClass('red');
            $('#dk_pdc_name_en').focus();
            return;
        } else {
            $('#dk_pdc_name_en').parent().parent().parent().find($(".help-block")).removeClass('red');
        }

        var pscListOrder = Number($('#pscCur').val()) + 1;
		var subIdx = $("#pscList"+pscListOrder).find("#psclistIdx").val();

        console.log("Pdc Submit : "+subIdx);

        $('#frmPdcRegi').ajaxForm({
            url: "pSubCategoryP.php",
            enctype: "multipart/form-data",
            success: function(response){
                let json = JSON.parse(response);
                if(json.result == "success") {
                    isAjaxing = false;
                    alert(json.resultMsg);
                    $("#pdcPopup, .col-popup-bg").fadeOut();

                    // let formData = new FormData();
                    // formData.append("subIdx", json.subIdx);
                    get_detail_category(subIdx);                   
                    //window.location.reload();							
                } else {
                    isAjaxing = false;
                    alert(json.resultMsg);
                    return;
                }
            },
            error: function(request, status, error) {
                isAjaxing = false;
                alert(error);
            }
        });			

        $("#frmPdcRegi").submit();
    });

});

// @@  제품카테고리 등록 START
function ppcReg(subCategoryName, pscIdx, pdcIdx){
    var detailTitle = subCategoryName +" - 제품 카테고리 입력";
    $("#ppcPopup, .col-popup-bg").fadeIn();
    $("#ppcPopup #Mode").val("Insert");
    $("#ppcPopup #pscIdx").val(pscIdx);
    $("#ppcPopup #pdcIdx").val(pdcIdx);
    $("#ppcPopup .col-tit").text(subCategoryName+" 제품 카테고리 등록");
	$(".current-file").hide();

    $("#dk_ppc_name_kr").val("");
    $("#dk_ppc_name_en").val("");
    $("#dk_ppc_name_jp").val("");
    $("#dk_ppc_name_cn").val("");
}

// @@ 제품카테고리 수정 START
function ppcModify(ppcIdx){
    $("#ppcPopup, .col-popup-bg").fadeIn();
    $("#ppcPopup .col-tit").text("상세카테고리명 수정");
    $("#ppcPopup #Mode").val("Modify");
    $("#ppcPopup #ppcIdx").val(ppcIdx);
	$(".current-file").show();

    // Ajax로 서브카테고리 내용 가져오기
    let formData = new FormData();
    formData.append("ppcIdx", ppcIdx);

    $.ajax({
        url : "/dotsAdmin/_inc/_getProductRow.php",
        data : formData,
        enctype: "multipart/form-data",
        processData : false,
        contentType : false,
        type : "POST",
        success : function(response){
            let json = JSON.parse(response);
            if(json.result == "success"){
                //console.log("Modify Detail : "+json.subIdx);
                document.getElementById("pdcIdx").value = json.subIdx;
                document.getElementById("dk_ppc_name_kr").value = json.productProgramKr;
                document.getElementById("dk_ppc_name_en").value = json.productProgramEn;
                document.getElementById("dk_ppc_name_cn").value = json.productProgramCn;
                document.getElementById("dk_ppc_name_jp").value = json.productProgramJp;
                 $("#dk_ppc_current_image").text(json.ppcImagepdsFilename);
				$("#dk_ppc_current_image").attr("href","/Upload/Products/"+json.ppcImagePdsFile);

//                get_detail_category(json.subIdx);

                var pscCur = $("#pscCur").val();

            } else if(json.result == "error"){
                alert(json.resultMsg);
                $("#manager_branch_id").parent().find($(".help-block")).text("소속 지점 관리자가 존재합니다.");
                $('#manager_branch_id').parent().find($(".help-block")).addClass('red');
                $('#tag').focus();
                return;
            }
        },
        error : function(response) {
        }
    });
}

// 제품 카테고리 Ajax - dx_ppc 테이블에서 제품 카테고리 정보 가져오기 
function get_product_category(pdcIdx) {

    let formData = new FormData();
    formData.append("pdcIdx", pdcIdx);

    $.ajax({
        url : "/dotsAdmin/_inc/_getProductCategory.php",
        data : formData,
        enctype: "multipart/form-data",
        processData : false,
        contentType : false,
        type : "POST",
        success : function(response){
            let json = JSON.parse(response);
            if(json.result == "success"){
                //console.log(json.detailProgram);
                $(".pro-depth-4").empty();    
                $(".pro-depth-4").append(json.ppcCategory);

                var checkIndex = $("#ppcCur").val();
                
                if(checkIndex==""){
                   $(".pro-depth-4 li:first-child").trigger("click");  
                }else{
                    $(".pro-depth-4 li").eq(checkIndex).trigger("click");  
                }
                
            } else if(json.result == "error"){
                //alert(json.resultMsg);
                $(".pro-depth-4").empty(); 
                $(".pro-depth-4").append(json.resultMsg);
                return;
            }
        },
        error : function(response) {
        }
    });
    
}

// 제품 카테고리 클릭 
$(document).on("click", ".pro-depth-4 li", function(){
    $(".pro-depth-4 li").removeClass("active");
    $(this).addClass("active");

    //var ppcIdx = $(this).find("#ppcListIdx").val();
    var ppcClickedId = $(this).attr('id');
    var idLength = ppcClickedId.length;
    var ppcClickedNo = ppcClickedId.substr(7, idLength) -1;

    //console.log("Detail Click NO : " + detailClickedNo);
    //console.log("Click Detail Program : " + pdcIdx);

    $("#ppcCur").val(ppcClickedNo);
    $(".help-block").empty();  
});

// 제품 카테고리 카테고리 등록
$(function() {
            
    isAjaxing = true;
    $("#goPpcSubmit").on("click", function(e) {

        if($("#dk_ppc_name_kr").val() == "") {
            alert("제품 카테고리 국문명을 입력해 주시기 바랍니다.");
            $("#dk_ppc_name_kr").parent().find($(".help-block")).text("상세 관리 카테고리 국문명을 입력해 주시기 바랍니다.");
            $('#dk_ppc_name_kr').parent().find($(".help-block")).addClass('red');
            $('#dk_ppc_name_kr').focus();
            return;
        } else {
            $('#dk_ppc_name_kr').parent().find($(".help-block")).removeClass('red');
        }


        if($("#dk_ppc_name_en").val() == "") {
            alert("제품 카테고리 영문명을 입력해 주시기 바랍니다.");
            $("#dk_ppc_name_en").parent().find($(".help-block")).text("상세 관리카테고리 영문명을 입력해 주시기 바랍니다.");
            $('#dk_ppc_name_en').parent().find($(".help-block")).addClass('red');
            $('#dk_ppc_name_en').focus();
            return;
        } else {
            $('#dk_ppc_name_en').parent().parent().parent().find($(".help-block")).removeClass('red');
        }


        var pscListOrder = Number($('#pscCur').val()) + 1;
		var subIdx = $("#pscList"+pscListOrder).find("#psclistIdx").val();

        console.log("Ppc Submit : "+subIdx);

        $('#frmPpcRegi').ajaxForm({
            url: "pSubCategoryP.php",
            enctype: "multipart/form-data",
            success: function(response){
                let json = JSON.parse(response);
                if(json.result == "success") {
                    isAjaxing = false;
                    alert(json.resultMsg);
                    $("#ppcPopup, .col-popup-bg").fadeOut();                   

                    get_detail_category(subIdx);

                var pscCur = $("#pscCur").val();
                } else {
                    isAjaxing = false;
                    alert(json.resultMsg);
                    return;
                }
            },
            error: function(request, status, error) {
                isAjaxing = false;
                alert(error);
            }
        });			

        $("#frmPpcRegi").submit();
    });

});

$(function(){
	//파일업로드 시작 (드래그앤 드랍)
	var $fileInput = $('.file-input');
	var $droparea = $('.file-drop-area');

	// highlight drag area
	$fileInput.on('dragenter focus click', function() {
		$droparea.addClass('is-active');
	});

	// back to normal state
	$fileInput.on('dragleave blur drop', function() {
		$droparea.removeClass('is-active');
	});

	// change inner text
	$fileInput.on('change', function() {
		var filesCount = $(this)[0].files.length;
		var $textContainer = $(this).prev();

		if (filesCount === 1) {
			// if single file is selected, show file name
			var fileName = $(this).val().split('\\').pop();
			$textContainer.text(fileName);
		} else {
			// otherwise show number of files
			$(this).next('.img-preview-area').find('img').attr('src' , '');
			$textContainer.text(filesCount + ' files selected');
		}

		readURL(this);
		$(this).next('.img-preview-area').css({ 'display' : '' })

	});
	//파일업로드 끝 (드래그앤 드랍)
})

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

//		var img = document.createElement("img"); 

		reader.onload = function(e) {
//			img.setAttribute("src", e.target.result); 
//			document.querySelector("div.imgViewArea").appendChild(img);
			$('.img-preview-area img').attr('src', e.target.result); 
		}
		reader.readAsDataURL(input.files[0]);
	}
}

function imgAreaError(a){
	a.parentElement.style.display="none";
//	$('.img-preview-area').css({ 'display' : 'none' });
}


$(".current-file a").on("click",function(e){
	e.preventDefault();
	var image = new Image();
	var imageSrc = $(this).attr("href");
	if(imageSrc=="#"){
		alert("등록된 이미지가 없습니다.");
		return;
	}
	image.src = imageSrc;

	var viewer = new Viewer(image, {
	  hidden: function () {
		viewer.destroy();
	  },
	});

    // image.click();
    viewer.show();
});