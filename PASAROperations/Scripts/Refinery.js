var serverpath = "";
//var serverpath = "/PASAROperation";


//-------------------------------------------------------------------------------partial events--------------------------------------------------------------------------------------------//
function ddactive_refinery_shorts(partialv_name) {

    $.ajax({
        type: 'POST',
        url: serverpath + '/Refinery/refinerytimelog_tabs_shorts/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $("#htab-panel_refine").html(result);
        }
    });
}
function ddactive_refinery(partialv_name) {

    $.ajax({
        type: 'POST',
        url: serverpath + '/Refinery/refinerytimelog_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $("#htab-panel_refine").html(result);
        }
    });
}
function ddactive_rpp(partialv_name) {
    $.ajax({
        type: 'POST',
        url: serverpath + '/Refinery/refinerytimelog_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel1').html(result);
        }
    });
}
function load_refinery_add_activity() {

    var partialview_link = serverpath + "/Refinery/load_refinery_add_activity/";
    $('#Dialog_Refinery_add_activity').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_refinery_add_csmlog() {

    var partialview_link = serverpath + "/Refinery/load_refinery_add_csmlog/";
    $('#Dialog_Refinery_add_csmlog').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function add_cropshorts_data(partialv_name) {
    var partialview_link = serverpath + "/Refinery/load_refinery_add_crop/";
    $('#Dialog_crop_add_activity').load(partialview_link, function () {
        $(this).dialog('open');
    });
    return false;
}

function edit_cropshorts_data(ActId_) {
    var partialview_link = serverpath + "/Refinery/edit_cropshorts_data/?actid=" + ActId_;
    $('#Dialog_crop_edit_activity').load(partialview_link, function () {
        $(this).dialog('open');
    });
    return false;
}

function add_prodact_data(key_id) {
    $.ajax({
        url: serverpath + "/Refinery/add_prodact_data/",
        data: {
            key_id: key_id,
        },
        success: function (data) {
            $('#Dialog_prod_add_activity').html(data).dialog('open');
            $('#ui-datepicker-div').hide();
            return false;
        }
    });
}

function edit_prodact_data(ActId_) {
    var partialview_link = serverpath + "/Refinery/edit_prodact_data/?actid=" + ActId_;
    $('#Dialog_prod_edit_activity').load(partialview_link, function () {
        $(this).dialog('open');
        $('#ui-datepicker-div').hide();
    });
    return false;
}

function load_popup_rppeditdate(key_id) {
    var monthyear = $('#ref_rppm_date').val();
    $.ajax({
        url: serverpath + "/Refinery/load_popup_rppeditdate/",
        data: {
            key_id: key_id,
            monthyear: monthyear
        },
        success: function (data) {
            $('#Dialog_Refinery_ProdPlanMonth_EditDate').html(data).dialog('open');
            return false;
        }
    });
}

function load_Refinery_prodact_option(key_id, sdate) {
    var thisblock = $('#load_production_by_block').val();
    $.ajax({
        url: serverpath + "/Refinery/load_Refinery_prodact_option/",
        data: {
            key_id: key_id,
            sdate: sdate,
            thisblock: thisblock
        },
        success: function (data) {
            $('#Dialog_prodact_option').html(data).dialog('open');
            return false;
        }
    });
}

function ddactive_rpp_month(partialv_name) {
    $('.ajax-loader').css("visibility", "visible");
    $.ajax({
        type: 'POST',
        url: serverpath + '/Refinery/ddactive_rpp_month/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel_refine').html(result);
            var iMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var iYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            var iiMonth = $("#rpp_imonth").text(iMonth);
            var iiYear = $("#rpp_iyear").text(iYear);

            var dd1 = $("#dd1").attr("class");
            var dd2 = $("#dd2").attr("class");

            if (dd1 == "active") {
                load_rpp_refine_tablemonth();
                load_block_prod_plan_month();
            }
            if (dd2 == "active") {
                drawChart_dataweek();
            }

        },
        complete: function () {
            $('.ajax-loader').css("visibility", "hidden");
        }
    });
}

//load Dialog add in production plan daily
function add_prodact_datadirect(key_id) {
    var rpp_daily_date = $("#rpp_daily_date").val();
    $.ajax({
        url: serverpath + "/Refinery/add_prodact_datadirect/",
        data: {
            key_id: key_id,
            rpp_daily_date: rpp_daily_date
        },
        success: function (data) {
            $('#Dialog_prod_add_activity').html(data).dialog('open');
            $('#ui-datepicker-div').hide();
            return false;
        }
    });
}

//load Dialog edit in production plan daily
function edit_prodact_direct_data_duration(key_id) {
    var thisblock = $('#load_production_by_block').val();
    var streamid = $('#streamid').val();
    var sdate = $('#rpp_daily_date').val();
    $.ajax({
        url: serverpath + "/Refinery/edit_prodact_direct_data_duration/",
        data: {
            key_id: key_id,
            sdate: sdate,
            thisblock: thisblock,
            streamid: streamid
        },
        success: function (data) {
            $('#Dialog_proddirect_edit_activity').html(data).dialog('open');
            return false;
        }
    });
}

//load Dialog insert in production plan daily
function prod_insert_data_duration(key_id) {
    var thisblock = $('#load_production_by_block').val();
    var sdate = $('#rpp_daily_date').val();
    var streamid = $('#streamid').val();
    $.ajax({
        url: serverpath + "/Refinery/edit_prod_insert_data_duration/",
        data: {
            key_id: key_id,
            sdate: sdate,
            thisblock: thisblock,
            streamid: streamid
        },
        success: function (data) {
            $('#Dialog_prod_insert_activity').html(data).dialog('open');
            return false;
        }
    });
}

function edit_prodact_direct_data_(key_id, sdate) {
    var thisblock = $('#load_production_by_block').val();
    $.ajax({
        url: serverpath + "/Refinery/edit_prodact_direct_data_/",
        data: {
            key_id: key_id,
            sdate: sdate,
            thisblock: thisblock
        },
        success: function (data) {
            $('#Dialog_proddirect_edit_activity').html(data).dialog('open');
            return false;
        }
    });
}

function add_prodact_datadirect_plan(key_id) {
    var rpp_daily_date = $("#rpp_daily_date").val();
    $.ajax({
        url: serverpath + "/Refinery/add_prodact_datadirect_plan/",
        data: {
            key_id: key_id,
            rpp_daily_date: rpp_daily_date
        },
        success: function (data) {
            $('#Dialog_prod_add_activity_plan').html(data).dialog('open');
            $('#ui-datepicker-div').hide();
            return false;
        }
    });
}

function load_Refinery_prodact_option_plan(key_id, sdate) {
    var thisblock = $('#load_production_by_block').val();
    $.ajax({
        url: serverpath + "/Refinery/load_Refinery_prodact_option_plan/",
        data: {
            key_id: key_id,
            sdate: sdate,
            thisblock: thisblock
        },
        success: function (data) {
            $('#Dialog_prodact_option_plan').html(data).dialog('open');
            return false;
        }
    });
}

function prod_insert_data_duration_plan(key_id) {
    var thisblock = $('#load_production_by_block').val();
    var sdate = $('#rpp_daily_date').val();
    $.ajax({
        url: serverpath + "/Refinery/edit_prod_insert_data_duration_plan/",
        data: {
            key_id: key_id,
            sdate: sdate,
            thisblock: thisblock
        },
        success: function (data) {
            $('#Dialog_prod_insert_activity_plan').html(data).dialog('open');
            return false;
        }
    });
}

function edit_prodact_direct_data_duration_plan(key_id) {
    var thisblock = $('#load_production_by_block').val();
    var sdate = $('#rpp_daily_date').val();
    $.ajax({
        url: serverpath + "/Refinery/edit_prodact_direct_data_duration_plan/",
        data: {
            key_id: key_id,
            sdate: sdate,
            thisblock: thisblock
        },
        success: function (data) {
            $('#Dialog_prod_edit_activity_plan').html(data).dialog('open');
            return false;
        }
    });
}

//load Dialog add in production plan daily no restriction
function add_prodact_add_restrict(key_id) {
    var rpp_daily_date = $("#rpp_daily_date").val();
    $.ajax({
        url: serverpath + "/Refinery/add_prodact_add_restrict/",
        data: {
            key_id: key_id,
            rpp_daily_date: rpp_daily_date
        },
        success: function (data) {
            $('#Dialog_prod_add_activity_restrict').html(data).dialog('open');
            $('#ui-datepicker-div').hide();
            return false;
        }
    });
}



//------------------------------------------------------------------------------ End of partial events--------------------------------------------------------------------------------------//



//------------------------------------------------------------------.on events, DOM manipulation .clic,keyup, ETC.--------------------------------------------------------------------------//

$('#refinery_tbl tr').on('click', function () {
    var theval = $(this).find('td:first-child').attr('id');
    var delid = $(this).find('td:nth-child(11)').attr('id');
    var editid = $(this).find('td:nth-child(12)').attr('id');

    beingclicked = theval;

    $('#refinery_tbl td').css('background-color', '#FFFFFF');

    if (lastclicked == 0) {
        $("td#disable_id_" + theval).removeClass();
        $("td#edit_id_" + theval).removeClass();

    } else {

        $("td#disable_id_" + lastclicked).addClass("disable_cfact");
        $("td#edit_id_" + lastclicked).addClass("edit_cfact");

        $("td#disable_id_" + theval).removeClass();
        $("td#edit_id_" + theval).removeClass();

    }

    $(this).children('td').css('background-color', '#FFFF99');

    $("td#disable_id_" + beingclicked).addClass("select_disable_AF_act");
    $("td#edit_id_" + beingclicked).addClass("select_edit_AF_act");

    lastclicked = theval;

});

$('#add_rpp_entry_btn').click(function () {
    add_rpp_row();
});
$('#add_rpp_entry_lnk').click(function () {
    add_rpp_row();
});

//checkking inputs
$(document).on('keyup', 'input[class*="rpp_input"]', function () {

    is_rpp_input($(this));
    setTimeout(check_rpp_input($(this).val(), $(this)), 2000);
    limitText($(this), 1);

});
$(document).on('keyup', 'input[id*="ppd_"]', function () {
    upperCaseF(this);
    limitText($(this), 3);
});


$('#add_ref_act_btn').click(function () {
    load_refinery_add_activity();
});

$('#add_ref_act_lnk').click(function () {
    load_refinery_add_activity();
});
$('#add_ref_csmlog_btn').click(function () {
    load_refinery_add_csmlog();
});
$('#add_ref_csmlog_lnk').click(function () {
    load_refinery_add_csmlog();
});

$(document).on('click', '.tabs.horizontal_ref dd', function () {

    $('.tabs.horizontal_ref dd').removeClass();
    $(this).addClass('active');
    $('.horizontaltabs_ref .tabs dd:first').addClass('active');

});

$('#ref_shift').change(function () {
    if ($(this).on('change')) {
        $('#ref_shift_btn').removeAttr('disabled');

    } else {
        $('#ref_shift_btn').attr('disabled', 'disabled');
    }
});
//---------------------------------------------------------------------End of ".on" events, DOM manipulation .clic,keyup ETC.-------------------------------------------------------//


//----------------------------------------------------------------------function Events--------------------------------------------------------------------------------------------//

// - Select REF Button
function load_refinery_functions() {

    $("#fsfe_log_header").css({ "background-color": "#FFFFCC" });
    $('input[type="text"],textarea,select').css({ "background-color": "#FFFFCC" });
    $('#rfm_select_crew').removeAttr('disabled');

    var interfaceid = $('#uiNo').text();
    switch (interfaceid) {
        case 'shorts':
            load_shorts_blocks();
            break;
        case '1':
            load_ref_manpower_data();
            break;
        case '2':
            load_ref_manpower_data();
            break;
        default:
    }
}

function add_rpp_row() {
    var countTH = $("#rpp_data_tbl tr:first > th").length;
    var cnt = 0;
    var toAppend = '';
    if (countTH > 0) {
        for (var x = 0; x < countTH; x++) {
            toAppend += '<td><input type="text" class="rpp_input" value=""/></td>';
        }

        $('#th_monthdays').after('<tr>' + toAppend + '<td class="rpp_x_tr" onclick="remove_tr(this); return false;">X</td></tr>');
    }
    //+ '<td class="rpp_x_tr" style="cursor:pointer;"><span>X</span></td>'
    //+ '<td><input type="text" class="rpp_in_remarks" disabled="disabled"  value="29/30"/></td>'
    //+ '<td><input type="text" class="rpp_input" disabled="disabled"  value="Plan"/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_in_remarks"  value=""/></td>'

}

function remove_tr($this) {
    $($this).closest('tr').remove();
}


//check capslock
function is_rpp_input(evt) {
    (evt).keypress(function (e) {
        var s = String.fromCharCode(e.which);
        if ((s.toUpperCase() === s && !e.shiftKey) ||
                 (s.toLowerCase() === s && e.shiftKey)) {
            return false;
            alert('Caps Lock is on.');
        }
        return true;
    });
}
//check input limit only 1 character
function limitText(field, maxChar) {
    var ref = $(field),
        val = ref.val();
    if (val.length >= maxChar) {
        ref.val(function () {
            return val.substr(0, maxChar);
        });
    }
}

function check_rpp_input(input, dom) {


    switch (input) {
        case "ST":
            //var isValid = check_limit_rpp(input, dom);
            //if (isValid == true) {
            dom.addClass('s_rpp_class');
            dom.val('ST');
            //}
            //else {
            //    alert("ERROR: Input will exceed maximum consecutive number of blocks(20).");
            //    dom.val('');
            //}
            break;
        case "CP1":
            //var isValid = check_limit_rppd_input(input, dom);
            //if (isValid == true) {
            dom.val('CP');
            dom.addClass('c_rpp_class');
            var get_block = dom.parent().siblings(":first").text();
            if (get_block >= 1 && get_block <= 36) {
                for (var i = 0; i < 19; i++) {
                    dom.closest('td').next('td').find('input.ppd_input').each(function () {
                        $(this).val('CP');
                        $(this).addClass('c_rpp_class');
                        dom = $(this);
                    });
                }
            } else if (get_block >= 37 && get_block <= 48) {
                for (var x = 0; x < 23; x++) {
                    dom.closest('td').next('td').find('input.ppd_input').each(function () {
                        $(this).val('CP');
                        $(this).addClass('c_rpp_class');
                        dom = $(this);
                    });
                }
            }
            //} else {
            //    alert("ERROR: Input will exceed maximum consecutive number of blocks(24).");
            //    dom.removeClass('c_rpp_class');
            //    dom.val('');
            //}
            break;
        case "e":
            //var isValid = check_limit_rpp(input, dom);
            //if (isValid == true) {
            dom.addClass('e_rpp_class');
            dom.val('e');
            //} else {
            //    alert("ERROR: Input will exceed maximum consecutive number of blocks(20).");
            //    dom.val('');
            //}
            break;
        case "l":
            //var isValid = check_limit_rpp(input, dom);
            //if (isValid == true) {
            dom.addClass('l_rpp_class');
            dom.val('l');
            //} else {
            //    alert("ERROR: Input will exceed maximum consecutive number of blocks(20).");
            //    dom.val('');
            //}
            break;
        case "":
            //var isValid = check_limit(input, dom);
            //if (isValid == true) {
            dom.removeClass('s_rpp_class');
            dom.removeClass('c_rpp_class');
            dom.removeClass('e_rpp_class');
            dom.removeClass('l_rpp_class');
            dom.val("");
            //} else {
            //    alert("ERROR: Input will exceed maximum consecutive number of blocks(20).");
            //    dom.val('');
            //}
            break;
            //case "r1":
            //    var isValid = check_limit_bulk(input, dom);
            //    if (isValid == true) {
            //        dom.val('r');
            //        for (i = 0; i < 19; i++) {
            //            dom.closest('td').next('td').find('input').each(function () {
            //                $(this).val('r');
            //                $(this).addClass('r_class');
            //                //$(this).css({ "background": "#3399ff !important", "color": "black" });
            //                dom = $(this);
            //            });
            //        }
            //    } else {
            //        alert("ERROR: Maximum consecutive number of blocks(20) will exceed.");
            //        dom.removeClass('r_class');
            //        dom.val('');
            //    }
            //    break;
            //case "ca":
            //    var isValid = check_limit(input, dom);
            //    if (isValid == true) {
            //        dom.addClass('ca_class');
            //        dom.val('ca');
            //    } else {
            //        alert("ERROR: Maximum consecutive number of blocks(20) will exceed.");
            //        dom.val('');
            //    }
            //    break;
            //case "ca1":
            //    var isValid = check_limit_bulk(input, dom);
            //    if (isValid == true) {
            //        dom.val('ca');
            //        dom.addClass('ca_class');
            //        //dom.css({ "background": "#000066 !important", "color": "white" });
            //        for (i = 0; i < 19; i++) {
            //            dom.closest('td').next('td').find('input').each(function () {
            //                $(this).val('ca');
            //                $(this).addClass('ca_class');
            //                //$(this).css({ "background": "#000066 !important", "color": "white" });
            //                dom = $(this);
            //            });
            //        }
            //    } else {
            //        alert("ERROR: Maximum consecutive number of blocks(20) will exceed.");
            //        dom.removeClass('ca_class');
            //        dom.val('');
            //    }
            //    break;
            //case "":
            //    dom.val('');
            //    dom.removeClass();
            //    break;
            //default:
            //    if (input.indexOf('x3') > -1) {
            //        dom.val('');
            //        dom.removeClass();
            //        //dom.css({ "background": "white !important" });
            //    }
            //    else if (input.indexOf('x2') > -1) {
            //        dom.closest('td').next('td').find('input').val('').css({ "background": "white !important" }).closest('td').next('td').find('input').val('').css({ "background": "white !important" })
            //        dom.val('');
            //        dom.removeClass();
            //        //dom.css({ "background": "white !important" });
            //    }
            //    else if (input.indexOf('x1') > -1) {
            //        dom.val('');
            //        dom.removeClass();
            //        //dom.css({ "background": "white !important" });
            //        for (i = 0; i < 19; i++) {
            //            dom.closest('td').next('td').find('input').each(function () {
            //                $(this).val('');
            //                $(this).removeClass();
            //                //$(this).css({ "background": "white !important" });
            //                dom = $(this);
            //            });
            //        }
            //    }
            //    break;
    }
    //var attrid = dom.parent().attr('id');
    //var paramid = attrid.replace('paramid_', '');

    // af_count_target(paramid);
}

function check_limit_rpp(input, dom) {

    var inn = input;
    var dmm = dom;
    var st = "";

}

function load_rpp_month(i, yy) {

    var days = [];

    var m = parseInt(i);
    var y = parseInt(yy);

    days = rpp_getDaysInMonth(m, y);

    $('.th_month_rpp').remove();
    $('#rpp_data_tbl td').parent().remove();
    for (var i = 0; i < days.length; i++) {

        $('#th_monthdays').append('<th class="th_month_rpp">' + days[i].getDate() + '</th>');
    }
}
function rpp_getDaysInMonth(month, year) {
    // Since no month has fewer than 28 days
    var date = new Date(year, month, 1);
    var days = [];
    //console.log('month', month, 'date.getMonth()', date.getMonth());
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;

}
function Get_rpp_MonthName(monthNumber) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber];
}


function load_ref_shorts_row_tab1() {



    var toAppendth = '';
    var toAppendtd = '';
    var toAppendtd_crop = '';
    $('#ref_short_p1 tr').remove();
    $('#ref_short_p1 td').parent().remove();
    var row_emp = $('#ref_row_shift').val();
    if (row_emp > 0) {

        $.ajax({
            url: serverpath + '/Refinery/load_ref_shorts_row/',
            data: {
                row_emp: row_emp,
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {

                    toAppendth += '<th>&nbsp;&nbsp;&nbsp;&nbsp;' + value.REF_BlockNo + '&nbsp;&nbsp;&nbsp;&nbsp;</th>';
                    toAppendtd += '<td><input id="shorts_1_' + value.REF_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>';
                    toAppendtd_crop += '<td><input id="crop_' + value.REF_BlockId + '" type="text" class="extratbl_input crop_' + value.REF_BlockId + '" onkeypress="return NumericOnly(event)" value="" disabled="disabled"/></td>';

                });
                var split_crop_input = toAppendtd_crop.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 0 for identification.
                var split_input = toAppendtd.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 1 to 18 for identification.           
                var input1 = '', input2 = '', input3 = '', input4 = '', input5 = '', input6 = '', input7 = '', input8 = '', input9 = '';
                var input10 = '', input11 = '', input12 = '', input13 = '', input14 = '', input15 = '', input16 = '', input17 = '', input18 = '', input19 = '';

                for (var sd = 1; sd < split_input.length; sd++) {
                    input1 += '<td><input id="shorts_1' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input2 += '<td><input id="shorts_2' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input3 += '<td><input id="shorts_3' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input4 += '<td><input id="shorts_4' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input5 += '<td><input id="shorts_5' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input6 += '<td><input id="shorts_6' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input7 += '<td><input id="shorts_7' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input8 += '<td><input id="shorts_8' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input9 += '<td><input id="shorts_9' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input10 += '<td><input id="shorts_10' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input11 += '<td><input id="shorts_11' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input12 += '<td><input id="shorts_12' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input13 += '<td><input id="shorts_13' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input14 += '<td><input id="shorts_14' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input15 += '<td><input id="shorts_15' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input16 += '<td><input id="shorts_16' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input17 += '<td><input id="shorts_17' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input18 += '<td><input id="shorts_18' + split_input[sd];
                }
                for (var sd = 1; sd < split_crop_input.length; sd++) {
                    input19 += '<td><input id="shorts_0' + split_crop_input[sd];
                }

                $('.ref_short_fixed_cell').show();
                $('#ref_short_p1 tbody').append('<tr><td>Crop</td>' + toAppendtd_crop + '</tr><tr class="p_tr1"><th colspan=' + toAppendth.length + '>Pass 1</th></tr><tr><th>No.</th>' + toAppendth + '</tr>'
                + '<tr class="f_tr1"><td class="rfc_tbltd">1</td>' + input1 + '</tr>'
                + '<tr class="b_tr1"><td class="rfc_tbltd">2</td>' + input2 + '</tr>'
                + '<tr><td class="rfc_tbltd">3</td>' + input3 + '</tr>'
                + '<tr><td class="rfc_tbltd">4</td>' + input4 + '</tr>'
                + '<tr><td class="rfc_tbltd">5</td>' + input5 + '</tr>'
                + '<tr><td class="rfc_tbltd">6</td>' + input6 + '</tr>'
                + '<tr><td class="rfc_tbltd">7</td>' + input7 + '</tr>'
                + '<tr><td class="rfc_tbltd">8</td>' + input8 + '</tr>'
                + '<tr><td class="rfc_tbltd">9</td>' + input9 + '</tr>'
                + '<tr><td class="rfc_tbltd">10</td>' + input10 + '</tr>'
                + '<tr><td class="rfc_tbltd">11</td>' + input11 + '</tr>'
                + '<tr><td class="rfc_tbltd">12</td>' + input12 + '</tr>'
                + '<tr><td class="rfc_tbltd">13</td>' + input13 + '</tr>'
                + '<tr><td class="rfc_tbltd">14</td>' + input14 + '</tr>'
                + '<tr><td class="rfc_tbltd">15</td>' + input15 + '</tr>'
                + '<tr><td class="rfc_tbltd">16</td>' + input16 + '</tr>'
                + '<tr><td class="rfc_tbltd">17</td>' + input17 + '</tr>'
                + '<tr><td class="rfc_tbltd">18</td>' + input18 + '</tr>'
                 );

                load_disable_by_block();
                input_shorts_change();
                navigate_cursor_with_arrow_keys();
            }
        });
        ref_shorts_load_data();
        ref_shorts_Crop_load_data();
    }
}


function load_ref_shorts_row_tab2() {

    $('#ref_short_p2 tr').remove();
    $('#ref_short_p2 td').parent().remove();
    var toAppendth = '';
    var toAppendtd = '';
    var toAppendtd_crop = '';
    var row_emp = $('#ref_row_shift').val();
    if (row_emp > 0) {

        $.ajax({
            url: serverpath + '/Refinery/load_ref_shorts_row/',
            data: {
                row_emp: row_emp,
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {

                    toAppendth += '<th>&nbsp;&nbsp;&nbsp;&nbsp;' + value.REF_BlockNo + '&nbsp;&nbsp;&nbsp;&nbsp;</th>';
                    toAppendtd += '<td><input id="shorts_2_' + value.REF_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>';
                    toAppendtd_crop += '<td><input id="shorts_2_' + value.REF_BlockId + '" type="number" class="extratbl_input crop_' + value.REF_BlockId + '" onkeyup="load_shorts_crop(this.id);" value="" disabled="disabled"/></td>';
                });
                var split_crop_input = toAppendtd_crop.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 0 for identification. 
                var split_input = toAppendtd.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 1 to 18 for identification.           
                var input1 = '', input2 = '', input3 = '', input4 = '', input5 = '', input6 = '', input7 = '', input8 = '', input9 = '';
                var input10 = '', input11 = '', input12 = '', input13 = '', input14 = '', input15 = '', input16 = '', input17 = '', input18 = '', input19 = '';

                for (var sd = 1; sd < split_input.length; sd++) {
                    input1 += '<td><input id="shorts_1' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input2 += '<td><input id="shorts_2' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input3 += '<td><input id="shorts_3' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input4 += '<td><input id="shorts_4' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input5 += '<td><input id="shorts_5' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input6 += '<td><input id="shorts_6' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input7 += '<td><input id="shorts_7' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input8 += '<td><input id="shorts_8' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input9 += '<td><input id="shorts_9' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input10 += '<td><input id="shorts_10' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input11 += '<td><input id="shorts_11' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input12 += '<td><input id="shorts_12' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input13 += '<td><input id="shorts_13' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input14 += '<td><input id="shorts_14' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input15 += '<td><input id="shorts_15' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input16 += '<td><input id="shorts_16' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input17 += '<td><input id="shorts_17' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input18 += '<td><input id="shorts_18' + split_input[sd];
                }
                for (var sd = 1; sd < split_crop_input.length; sd++) {
                    input19 += '<td><input id="shorts_0' + split_crop_input[sd];
                }

                $('.ref_short_fixed_cell').show();
                $('#ref_short_p2 tbody').append('<tr class="shorts_crop"><td>Crop</td>' + input19 + '</tr><tr class="p_tr2"><th colspan=' + toAppendth.length + '>Pass 2</th></tr><tr><th>No.</th>' + toAppendth + '</tr>'
                + '<tr class="f_tr2"><td class="rfc_tbltd">1</td>' + input1 + '</tr>'
                + '<tr class="b_tr2"><td class="rfc_tbltd">2</td>' + input2 + '</tr>'
                + '<tr><td class="rfc_tbltd">3</td>' + input3 + '</tr>'
                + '<tr><td class="rfc_tbltd">4</td>' + input4 + '</tr>'
                + '<tr><td class="rfc_tbltd">5</td>' + input5 + '</tr>'
                + '<tr><td class="rfc_tbltd">6</td>' + input6 + '</tr>'
                + '<tr><td class="rfc_tbltd">7</td>' + input7 + '</tr>'
                + '<tr><td class="rfc_tbltd">8</td>' + input8 + '</tr>'
                + '<tr><td class="rfc_tbltd">9</td>' + input9 + '</tr>'
                + '<tr><td class="rfc_tbltd">10</td>' + input10 + '</tr>'
                + '<tr><td class="rfc_tbltd">11</td>' + input11 + '</tr>'
                + '<tr><td class="rfc_tbltd">12</td>' + input12 + '</tr>'
                + '<tr><td class="rfc_tbltd">13</td>' + input13 + '</tr>'
                + '<tr><td class="rfc_tbltd">14</td>' + input14 + '</tr>'
                + '<tr><td class="rfc_tbltd">15</td>' + input15 + '</tr>'
                + '<tr><td class="rfc_tbltd">16</td>' + input16 + '</tr>'
                + '<tr><td class="rfc_tbltd">17</td>' + input17 + '</tr>'
                + '<tr><td class="rfc_tbltd">18</td>' + input18 + '</tr>'
                 );

                load_disable_by_block();
                $('.shorts_crop').css({ "visibility": "hidden" });
                input_shorts_change();
                ref_shorts_load_data();
                //ref_shorts_Crop_load_data();
                navigate_cursor_with_arrow_keys();
            }
        });
    }
}


function load_ref_shorts_row_tab3() {

    $('#ref_short_p3 tr').remove();
    $('#ref_short_p3 td').parent().remove();
    var toAppendth = '';
    var toAppendtd = '';
    var toAppendtd_crop = '';
    var row_emp = $('#ref_row_shift').val();
    if (row_emp > 0) {
        $('.ajax-loader').css("visibility", "visible");
        $.ajax({
            url: serverpath + '/Refinery/load_ref_shorts_row/',
            data: {
                row_emp: row_emp,
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {

                    toAppendth += '<th>&nbsp;&nbsp;&nbsp;&nbsp;' + value.REF_BlockNo + '&nbsp;&nbsp;&nbsp;&nbsp;</th>';
                    toAppendtd += '<td><input id="shorts_3_' + value.REF_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>';
                    toAppendtd_crop += '<td><input id="shorts_3_' + value.REF_BlockId + '" type="number" class="extratbl_input crop_' + value.REF_BlockId + '" onkeyup="load_shorts_crop(this.id);" value="" disabled="disabled"/></td>';
                });

                var split_crop_input = toAppendtd_crop.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 0 for identification. 
                var split_input = toAppendtd.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 1 to 18 for identification.           
                var input1 = '', input2 = '', input3 = '', input4 = '', input5 = '', input6 = '', input7 = '', input8 = '', input9 = '';
                var input10 = '', input11 = '', input12 = '', input13 = '', input14 = '', input15 = '', input16 = '', input17 = '', input18 = '', input19 = '';


                for (var sd = 1; sd < split_input.length; sd++) {
                    input1 += '<td><input id="shorts_1' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input2 += '<td><input id="shorts_2' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input3 += '<td><input id="shorts_3' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input4 += '<td><input id="shorts_4' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input5 += '<td><input id="shorts_5' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input6 += '<td><input id="shorts_6' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input7 += '<td><input id="shorts_7' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input8 += '<td><input id="shorts_8' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input9 += '<td><input id="shorts_9' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input10 += '<td><input id="shorts_10' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input11 += '<td><input id="shorts_11' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input12 += '<td><input id="shorts_12' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input13 += '<td><input id="shorts_13' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input14 += '<td><input id="shorts_14' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input15 += '<td><input id="shorts_15' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input16 += '<td><input id="shorts_16' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input17 += '<td><input id="shorts_17' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input18 += '<td><input id="shorts_18' + split_input[sd];
                }
                for (var sd = 1; sd < split_crop_input.length; sd++) {
                    input19 += '<td><input id="shorts_0' + split_crop_input[sd];
                }

                $('.ref_short_fixed_cell').show();
                $('#ref_short_p3 tbody').append('<tr class="shorts_crop"><td>Crop</td>' + input19 + '</tr><tr class="p_tr3"><th colspan=' + toAppendth.length + '>Pass 3</th></tr><tr><th>No.</th>' + toAppendth + '</tr>'
                + '<tr id="tr1" class="f_tr3"><td class="rfc_tbltd">1</td>' + input1 + '</tr>'
                + '<tr id="tr2" class="b_tr3"><td class="rfc_tbltd">2</td>' + input2 + '</tr>'
                + '<tr id="tr3"><td class="rfc_tbltd">3</td>' + input3 + '</tr>'
                + '<tr id="tr4"><td class="rfc_tbltd">4</td>' + input4 + '</tr>'
                + '<tr id="tr5"><td class="rfc_tbltd">5</td>' + input5 + '</tr>'
                + '<tr id="tr6"><td class="rfc_tbltd">6</td>' + input6 + '</tr>'
                + '<tr id="tr7"><td class="rfc_tbltd">7</td>' + input7 + '</tr>'
                + '<tr id="tr8"><td class="rfc_tbltd">8</td>' + input8 + '</tr>'
                + '<tr id="tr9"><td class="rfc_tbltd">9</td>' + input9 + '</tr>'
                + '<tr id="tr10"><td class="rfc_tbltd">10</td>' + input10 + '</tr>'
                + '<tr id="tr11"><td class="rfc_tbltd">11</td>' + input11 + '</tr>'
                + '<tr id="tr12"><td class="rfc_tbltd">12</td>' + input12 + '</tr>'
                + '<tr id="tr13"><td class="rfc_tbltd">13</td>' + input13 + '</tr>'
                + '<tr id="tr14"><td class="rfc_tbltd">14</td>' + input14 + '</tr>'
                + '<tr id="tr15"><td class="rfc_tbltd">15</td>' + input15 + '</tr>'
                + '<tr id="tr16"><td class="rfc_tbltd">16</td>' + input16 + '</tr>'
                + '<tr id="tr17"><td class="rfc_tbltd">17</td>' + input17 + '</tr>'
                + '<tr id="tr18"><td class="rfc_tbltd">18</td>' + input18 + '</tr>'
                 );

                load_disable_by_block();
                $('.shorts_crop').css({ "visibility": "hidden" });
                input_shorts_change();
                ref_shorts_load_data();
                //ref_shorts_Crop_load_data();
                navigate_cursor_with_arrow_keys();
            },
            complete: function () {
                $('.ajax-loader').css("visibility", "hidden");
            }
        });
    }
}

function input_shorts_change() {
    $('input').change(
                  function () {
                      if ($(this).val() == '') {
                          $(this).css({ 'background-color': '#ffffcc' });
                          //$(this).removeClass('changed');
                          $(this).addClass('changed');
                      } else {
                          $(this).css({ 'background-color': '#DFD8D1' });
                          $(this).addClass('changed');
                      }
                  });
}

function load_disable_by_block() {
    $('.refinery_class_table').find('input[id*="shorts_"]').each(function () {
        var attid = $(this).attr('id');
        var paramid = attid.replace('shorts_', '');
        var getp = paramid.split('_');
        var cellno = getp[0];
        var passno = getp[1];
        var blockId = getp[2];

        if (blockId >= 1 && blockId <= 36) {
            $('input[id*="shorts_15"]').each(function () { $(this).prop("disabled", true); });
            $('input[id*="shorts_16"]').each(function () { $(this).prop("disabled", true); });
            $('input[id*="shorts_17"]').each(function () { $(this).prop("disabled", true); });
            $('input[id*="shorts_18"]').each(function () { $(this).prop("disabled", true); });
        } else if (blockId == 37) {
            $('input[id*="shorts_1_' + passno + '_37"]').each(function () { $(this).prop("disabled", true); });

            $('input[id*="shorts_15"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_16"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_17"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_18"]').each(function () { $(this).prop("disabled", false); });

        } else if (blockId == 38) {
            $('input[id*="shorts_1_' + passno + '_38"]').each(function () { $(this).prop("disabled", true); });

            $('input[id*="shorts_15"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_16"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_17"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_18"]').each(function () { $(this).prop("disabled", false); });
        }
    });
}

function navigate_cursor_with_arrow_keys() {

    $('input').keydown(function (e) {
        if (e.which == 39) { // right arrow
            $(this).closest('td').next().find('input').focus();

        } else if (e.which == 37) { // left arrow
            $(this).closest('td').prev().find('input').focus();

        } else if (e.which == 40) { // down arrow
            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();

        } else if (e.which == 38) { // up arrow
            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
        }
        else if (e.which == 13) { // next line
            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
            if ($("#ref_row_shift").val() >= 1 && $("#ref_row_shift").val() <= 4) {
                if ($(this).closest("tr").find("td:first").text() == 14) {
                    var focused;
                    $(":focus").each(function () {
                        focused = this.id;
                    });
                    var paramid = focused.replace('shorts_', '');
                    var getp = paramid.split('_');
                    var passno = getp[1];
                    var blk = getp[2];
                    var cell = getp[0];
                    if (passno == 1) {

                        $("tr.f_tr1").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blk >= 33 && blk <= 48 && cell == 14 ) {
                        //    $("tr.f_tr2").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //   alert(passno + " " + blk);
                        //}
                    } else if (passno == 2) {
                        $("tr.f_tr2").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blockId >= 33 && blockId <= 48) {
                        //    $("tr.f_tr3").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();   
                        //}
                    } else if (passno == 3) {
                        $("tr.f_tr3").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blockId >= 33 && blockId <= 48) {
                        //    $("tr.f_tr1").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //}
                    }

                }
            } else {
                if ($(this).closest("tr").find("td:first").text() == 18) {
                    var focused;
                    $(":focus").each(function () {
                        focused = this.id;
                    });
                    var paramid = focused.replace('shorts_', '');
                    var getp = paramid.split('_');
                    var passno = getp[1];
                    var blockId = getp[2];
                    if (passno == 1) {
                        $("tr.f_tr1").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blockId >= 33 && blockId <= 48) {
                        //    $("tr.b_tr2").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //}
                    } else if (passno == 2) {
                        $("tr.f_tr2").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blockId >= 33 && blockId <= 48) {
                        //    $("tr.b_tr3").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //}
                    } else if (passno == 3) {
                        $("tr.f_tr3").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blockId >= 33 && blockId <= 48) {
                        //    $("tr.b_tr1").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //}
                    }
                }
            }
        }
    });

}


function load_shorts_crop($this) {

    var id = $('#' + $this);
    var evt = $('#' + $this).attr('class');
    var spt = evt.split(" ");
    var $class = spt[1];
    var this_val = id.val().replace(/[^1-9\.]/g, '');
    $('.' + $class).val(this_val);
    $('.' + $class).addClass("changed");

}
function ref_load_shorts_employeerow() {

    $.ajax({
        url: serverpath + '/Refinery/ref_load_shorts_employeerow',
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                //$('#ref_row_shift').append('<option value=' + value.REFTH_RowNo + '>' + value.REFTH_RowNo + ' - ' + value.Fullname + '</option>');
                $('#ref_row_shift').append('<option value=' + value.REFTH_RowNo + '>' + value.REFTH_RowNo + '</option>');

                //remove duplicate data in selectbox
                var usedNames = {};
                $("#ref_row_shift > option").each(function () {
                    if (usedNames[this.value]) {
                        $(this).remove();
                    } else {
                        usedNames[this.value] = this.text;
                    }
                });
            });
        }
    });
}

function ref_shorts_load_data() {

    var proddate = $('#ref_proddate').val();
    var shiftId = $('#ref_shift').val();
    var row_emp = $('#ref_row_shift').val();
    $('input[id*="shorts_"]').each(function () {
        $(this).val('');
        $(this).removeClass('changed');
        $(this).css({ 'background-color': '#ffffcc' });
    });

    $.ajax({
        url: serverpath + '/Refinery/ref_shorts_load_data/',
        data: {
            proddate: proddate,
            shiftId: shiftId,
            row_emp: row_emp
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var REFTH_ShortCount;

                REFTH_ShortCount = value.REFTH_ShortCount == null ? "" : value.REFTH_ShortCount;

                $('#shorts_' + value.REFTH_CellNo + '_' + value.REFTH_PassNo + '_' + value.REFTH_BlockId + '').val(REFTH_ShortCount);
                $('#shorts_' + value.REFTH_CellNo + '_' + value.REFTH_PassNo + '_' + value.REFTH_BlockId + '').removeClass('changed');
                $('#shorts_' + value.REFTH_CellNo + '_' + value.REFTH_PassNo + '_' + value.REFTH_BlockId + '').css({ 'background-color': '#ffffcc' });

            });
        }
    });
}

function ref_shorts_Crop_load_data() {

    var proddate = $('#ref_proddate').val();
    var shiftId = $('#ref_shift').val();
    var row_emp = $('#ref_row_shift').val();
    $('input[id*="crop_"]').each(function () {
        $(this).val('');
        $(this).removeClass('changed');
        $(this).css({ 'background-color': '#ffffcc' });
    });

    $.ajax({
        url: serverpath + '/Refinery/ref_shorts_Crop_load_data/',
        data: {
            proddate: proddate,
            shiftId: shiftId,
            row_emp: row_emp
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var REFTH_Crop;
                REFTH_Crop = value.REFTH_Crop == null ? "" : value.REFTH_Crop;

                $('#crop_' + value.REFTH_BlockId + '').val(REFTH_Crop);
                $('#crop_' + value.REFTH_BlockId + '').removeClass('changed');
                $('#crop_' + value.REFTH_BlockId + '').css({ 'background-color': '#ffffcc' });

            });
        }
    });
}

function save_ref_shorts() {

    var proddate = $('#ref_proddate').val();
    var shiftId = $('#ref_shift').val();
    var row_emp = $('#ref_row_shift').val();

    var items = [];

    if (proddate == '' || shiftId == '') {

        alert('Please select date and shift.');

    } else if (row_emp == 0 || row_emp == '--Select--' || row_emp == '') {

        alert('Please select row.');

    } else {

        $('.refinery_class_table').find('input[id*="shorts_"].changed').each(function () {
            var attid = $(this).attr('id');
            var paramid = attid.replace('shorts_', '');
            var getp = paramid.split('_');
            var short_count = $(this).val();
            var cellno = getp[0];
            var passno = getp[1];
            var blockId = getp[2];

            items.push({
                prodate: proddate,
                shiftno: shiftId,
                passno: passno,
                blockId: blockId,
                row_emp: row_emp,
                cellno: cellno,
                short_count: short_count
            });
        });
        items = JSON.stringify({ 'items': items });
        $('.ajax-loader').css("visibility", "visible");
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            cache: false,
            url: serverpath + '/Refinery/save_ref_shorts/',
            data: items,
            success: function (data) {
                $('.ajax-loader').css("visibility", "hidden");
                alert('Shorts changes now saved.');
                ref_shorts_load_data();
                ref_shorts_Crop_load_data();
            },
            complete: function () {
                $('.ajax-loader').css("visibility", "hidden");
            }
        });
    }
}

function save_ref_shortsCrop() {

    var proddate = $('#ref_proddate').val();
    var shiftId = $('#ref_shift').val();
    var row_emp = $('#ref_row_shift').val();

    var items = [];

    if (proddate == '' || shiftId == '') {

        alert('Please select date and shift.');

    } else if (row_emp == 0 || row_emp == '--Select--' || row_emp == '') {

        alert('Please select row.');

    } else {

        $('.refinery_class_table').find('input[id*="crop_"].changed').each(function () {
            var attid = $(this).attr('id');
            var paramid = attid.replace('crop_', '');
            var getp = paramid.split('_');
            var short_crop = $(this).val();
            var blockId = getp[0];
            items.push({
                pdate: proddate,
                shiftn: shiftId,
                blockno: blockId,
                row_id: row_emp,
                short_crop: short_crop
            });
        });

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            cache: false,
            url: serverpath + '/Refinery/save_ref_shortsCrop/',
            data: items,
            success: function (data) {
                alert('Shorts crop changes now saved.');
                ref_shorts_Crop_load_data();
            }
        });
    }
}

function save_shorts_data() {
    save_ref_shorts();
    //save_ref_shortsCrop();
}

function load_shorts_blocks() {
    load_ref_shorts_row_tab1();
    load_ref_shorts_row_tab2();
    load_ref_shorts_row_tab3();
}
//--------------------------------------------------------------------------------------------functions for manpower--------------------------------------------------------------------------------------//

// load employee for man power 
function load_ref_employee(deptid) {

    $.ajax({
        url: serverpath + '/Refinery/load_ref_employee/',
        data: {
            deptid: deptid,
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('.refinery_manpower_table').find('select[id*="ref_manpower_"]').each(function () {
                    $(this).append("<option value = " + value.EmployeeId + ">" + value.Fullname + "</option>");
                });
            });
            load_crew_select();
            load_ref_manpower_data();
        }
    });
}


//save employee for man power
function save_ref_manpower() {

    var proddate = $('#ref_proddate').val();
    var shiftId = $('#ref_shift').val();
    var crew_default = $('#rfm_select_crew').val();
    var items = [];

    if (proddate == '' || shiftId == '') {

        alert('Please select date and shift.');

    } else if (crew_default == 0 || crew_default == '--Select--' || crew_default == '') {

        alert('Please select crew.');

    } else {

        $('.refinery_manpower_table').find('select[id*="ref_manpower_"]').each(function () {
            var attid = $(this).attr('id');
            var paramid = attid.replace('ref_manpower_', '');
            var getp = paramid.split('_');
            var empId = $(this).val();
            var roletypeId = getp[0];
            var roleGroupId = getp[1];

            items.push({
                proddate: proddate,
                shiftId: shiftId,
                roletypeId: roletypeId,
                empId: empId,
                roleGroupId: roleGroupId,
                crew_default: crew_default
            });
        });

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            cache: false,
            url: serverpath + '/Refinery/save_ref_manpower/',
            data: items,
            success: function (data) {
                alert('Manpower changes now saved.');
                load_ref_manpower_data();
            }
        });
    }
}

// load saved data for man power
function load_ref_manpower_data() {

    var prod_date = $("#ref_proddate").val();
    var shiftId = $("#ref_shift").val();
    var rolegroup = $('#uiNo_manpower').text();

    $('select[id*="ref_manpower_"]').each(function () { $(this).val(0) });
    $('#rfm_select_crew').val(0);

    $.ajax({
        url: serverpath + '/Refinery/load_ref_manpower_data/',
        data: {
            proddate: prod_date,
            shiftId: shiftId,
            rolegroup: rolegroup
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#rfm_select_crew').val(value.REFTH_CrewId);
                $('#ref_manpower_' + value.REFTH_RoleTypeId + '_' + value.REFTH_RoleGroup_Id + '').val(value.REFTH_EmpId);
                $('#ref_manpower_' + value.REFTH_RoleTypeId + '_' + value.REFTH_RoleGroup_Id + '').removeAttr('disabled');

            });
        }
    });
}

//load saved crew defaults for man power
function load_ref_crewlist_manpower() {

    var default_crew = $('#rfm_select_crew').val();

    $('select[id*="ref_manpower_"]').each(function () {
        $(this).val(0);
        $(this).removeClass('changed');
    });

    $.ajax({
        url: serverpath + '/Refinery/load_ref_crewlist_manpower/',
        data: {
            default_crew: default_crew
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#ref_manpower_' + value.REFTH_RoleTypeId + '_' + value.REFTH_RoleGroupId + '').val(value.REFTH_EmpId);
                $('#ref_manpower_' + value.REFTH_RoleTypeId + '_' + value.REFTH_RoleGroupId + '').addClass('changed');
            });
        }
    });
}

//enable select tag of employee man power
function enable_rfm_select_manpower() {

    $('select[id*="ref_manpower_"]').each(function () {
        $(this).removeAttr("disabled");
    });
    load_ref_crewlist_manpower();
}

//enable select tag of crew man power if date and shift already selected
function enable_select_crew_manpower() {

    var prod_date = $("#ref_proddate").val();
    var shiftId = $("#ref_shift").val();

    if (prod_date == '' || shiftId == '') {
        $('#rfm_select_crew').prop("disabled", true);
        $('select[id*="ref_manpower_"]').each(function () {
            $(this).prop("disabled", true);
        });
    }
}

//---------------------------------------------------------------------------------functions for crew defaults----------------------------------------------------------------------------------------//

//load crew(team) for crew defaults
function load_crew_select() {

    $('select[id*="rfm_select_crew"]').each(function () { $(this).val(0); });

    $.ajax({
        url: serverpath + '/Refinery/load_crew_select/',
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $("#rfm_select_crew").append("<option value=" + value.REFTH_CrewId + ">" + value.REFTH_CrewName + "</option>");

                //remove duplicate data in selectbox
                var usedNames = {};
                $("#rfm_select_crew > option").each(function () {
                    if (usedNames[this.value]) {
                        $(this).remove();
                    } else {
                        usedNames[this.value] = this.text;
                    }
                });

            });
        }
    });
}

// load employee for crew defaults
function load_ref_employee_crew_default(deptid) {

    $.ajax({
        url: serverpath + '/Refinery/load_ref_employee/',
        data: {
            deptid: deptid,
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('.refinery_manpower_table').find('select[id*="ref_manpower_"]').each(function () {
                    $(this).append("<option value = " + value.EmployeeId + ">" + value.Fullname + "</option>");

                });
            });
            load_crew_select();
        }
    });
}

//save crew for crew defaults
function save_ref_default_manpower() {

    var default_crew = $('#rfm_select_crew').val();
    var items = [];

    if (default_crew == 0 || default_crew == '--Select--' || default_crew == '') {
        alert('Please select crew.');
    } else {
        $('.refinery_manpower_table').find('select[id*="ref_manpower_"].changed').each(function () {
            var attid = $(this).attr('id');
            var paramid = attid.replace('ref_manpower_', '');
            var getp = paramid.split('_');
            var empId = $(this).val();
            var roletypeId = getp[0];
            var roleGroupId = getp[1];

            items.push({
                cd_roleGroupId: roleGroupId,
                cd_roletypeId: roletypeId,
                cd_default_crew: default_crew,
                cd_empId: empId
            });
        });

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            cache: false,
            url: serverpath + '/Refinery/save_ref_default_manpower/',
            data: items,
            success: function (data) {
                alert('Crew defaults changes now saved.');
                load_ref_default_manpower();
            }
        });
    }
}

//load saved crew defaults
function load_ref_default_manpower() {

    var default_crew = $('#rfm_select_crew').val();

    $('select[id*="ref_manpower_"]').each(function () { $(this).val(0) });

    $.ajax({
        url: serverpath + '/Refinery/load_ref_default_manpower/',
        data: {
            default_crew: default_crew
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#ref_manpower_' + value.REFTH_RoleTypeId + '_' + value.REFTH_RoleGroupId + '').val(value.REFTH_EmpId);
            });
        }
    });
}

//enable select tag of employee crew defaults
function enable_rfm_select() {

    $('select[id*="ref_manpower_"]').each(function () {
        $(this).removeAttr("disabled");
    });
    load_ref_default_manpower();
}


function validation_ref_shorts_crop_add() {

    var add_s_date = new Date($('#Dialog_crop_add_activity #start_date_ref_add_act').val());
    var s_hr = $('#Dialog_crop_add_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_crop_add_activity #start_time_min_ref_add_act').val();


    var add_e_date = new Date($('#Dialog_crop_add_activity #end_date_ref_add_act').val());
    var end_hr = $('#Dialog_crop_add_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_crop_add_activity #end_time_min_ref_add_act').val();


    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $('#Dialog_crop_add_activity #error_msg_time_ref').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_crop_add_activity #addbtn_ref_crop').attr('disabled', true);
    } else {
        $('#Dialog_crop_add_activity #error_msg_time_ref').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_crop_add_activity #addbtn_ref_crop').attr('disabled', false);

    }

}


function validation_ref_shorts_crop_edit() {

    var add_s_date = new Date($('#Dialog_crop_edit_activity #start_date_ref_edit_act').val());
    var s_hr = $('#Dialog_crop_edit_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_crop_edit_activity #start_time_min_ref_add_act').val();


    var add_e_date = new Date($('#Dialog_crop_edit_activity #end_date_ref_edit_act').val());
    var end_hr = $('#Dialog_crop_edit_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_crop_edit_activity #end_time_min_ref_add_act').val();


    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $('#Dialog_crop_edit_activity #error_msg_time_ref').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_crop_edit_activity #addbtn_ref_crop').attr('disabled', true);
    } else {
        $('#Dialog_crop_edit_activity #error_msg_time_ref').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_crop_edit_activity #addbtn_ref_crop').attr('disabled', false);

    }

}

function add_ref_crop() {


    var crop = '';
    var blockid = $('#Dialog_crop_add_activity #blockid').val();
    var cropid = $('#Dialog_crop_add_activity #cropid').val();
    var elapsedKAH_crop = $('#Dialog_crop_add_activity #elapsedKAH_crop').val();

    var s_date = new Date($('#Dialog_crop_add_activity #start_date_ref_add_act').val());
    var s_hr = $('#Dialog_crop_add_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_crop_add_activity #start_time_min_ref_add_act').val();

    var end_date = new Date($('#Dialog_crop_add_activity #end_date_ref_add_act').val());
    var end_hr = $('#Dialog_crop_add_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_crop_add_activity #end_time_min_ref_add_act').val();

    add_start_date_ = s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });


    var start_date = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");
    var end_date = add_end_date_.toString("ddd, dd MMM yyyy H:mm:ss ");



    $.ajax({
        url: afserverpath + '/Refinery/add_ref_crop/',
        data: {
            blockid: blockid,
            cropid: cropid,
            start_date: start_date,
            end_date: end_date,
            elapsedKAH_crop: elapsedKAH_crop,
            crop: crop

        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_crop_add_activity').dialog('close');
            alert('Data now saved.');
            load_data_ref_crop($('#ref_crop_date').val());
            //load_data_ref_crop_nofilter();
        }
    });
}

function edit_ref_crop() {


    var crop = $('#Dialog_crop_edit_activity #cropid_edit').text();
    var blockid = $('#Dialog_crop_edit_activity #blockid').val();
    var cropid = $('#Dialog_crop_edit_activity #cropid').val();
    var elapsedKAH_crop = $('#Dialog_crop_edit_activity #elapsedKAH_crop_edit').val();

    var s_date = new Date($('#Dialog_crop_edit_activity #start_date_ref_edit_act').val());
    var s_hr = $('#Dialog_crop_edit_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_crop_edit_activity #start_time_min_ref_add_act').val();

    var end_date = new Date($('#Dialog_crop_edit_activity #end_date_ref_edit_act').val());
    var end_hr = $('#Dialog_crop_edit_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_crop_edit_activity #end_time_min_ref_add_act').val();

    add_start_date_ = s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });


    var start_date = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");
    var end_date = add_end_date_.toString("ddd, dd MMM yyyy H:mm:ss ");



    $.ajax({
        url: afserverpath + '/Refinery/edit_ref_crop/',
        data: {
            blockid: blockid,
            cropid: cropid,
            start_date: start_date,
            end_date: end_date,
            elapsedKAH_crop: elapsedKAH_crop,
            crop: crop
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_crop_edit_activity').dialog('close');
            alert('Data now saved.');
            load_data_ref_crop($('#ref_crop_date').val());
            //load_data_ref_crop_nofilter();

        }
    });
}

function load_data_ref_crop(date_) {
    var iiMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
    var iiYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
    $("#crop_imonth").text(iiMonth);
    $("#crop_iyear").text(iiYear);
    var iMonth = $("#crop_imonth").text();
    var iYear = $("#crop_iyear").text();
    $('#ref_crop_table td').parent().remove();

    $.ajax({
        url: serverpath + '/Refinery/load_data_ref_crop/',

        data: {
            date: date_,
            iMonth: iMonth,
            iYear: iYear
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var shift = value.REFTH_StartShiftId == null ? "-" : value.REFTH_StartShiftId;
                var REFTH_ElapsedKAH = value.REFTH_ElapsedKAH == null ? "-" : value.REFTH_ElapsedKAH;

                $('#ref_crop_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockPair + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_CropNo + '</td>'
                    + '<td class="dfault_crop">' + REFTH_ElapsedKAH + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateStart) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateEnd) + '</td>'
                    + '<td class="dfault_crop">' + shift + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + value.REFTH_CropId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + value.REFTH_CropId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_crop_table', 30);
            });
        }
    });
}

function load_data_ref_crop_nofilter() {

    $('#ref_crop_table td').parent().remove();

    $.ajax({
        url: serverpath + '/Refinery/load_data_ref_crop_nofilter/',
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var shift = value.REFTH_StartShiftId == null ? "-" : value.REFTH_StartShiftId;
                var REFTH_ElapsedKAH = value.REFTH_ElapsedKAH == null ? "-" : value.REFTH_ElapsedKAH;

                $('#ref_crop_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockPair + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_CropNo + '</td>'
                    + '<td class="dfault_crop">' + REFTH_ElapsedKAH + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateStart) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateEnd) + '</td>'
                    + '<td class="dfault_crop">' + shift + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + value.REFTH_CropId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + value.REFTH_CropId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_crop_table', 30);
            });
        }
    });
}

function delete_cropshorts_data(ActId_) {


    themsg = 'Are you sure you want to delete this ?';

    var answer = confirm(themsg);

    if (answer) {
        $.ajax({
            url: serverpath + '/Refinery/delete_cropshorts_data/',
            data: {
                actid: ActId_
            },
            type: 'POST',
            cache: false,
            success: function (data) {

                load_data_ref_crop($('#ref_crop_date').val());
                //load_data_ref_crop_nofilter();

            }
        });
    }

}

function searchin_crop(input, tbl) {
    var input = $('#search_shortscrop option:selected');

    $(tbl).each(function () {
        if ($(this).find('td').eq(0).text() == $('#search_shortscrop option:selected').text()) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function load_data_ref_crop_sdate() {

    var sdate = $('#cropdate_filter').val();
    var blockid = $('#search_shortscrop').val();
    var monthyear = $('#ref_crop_date').val();
    var iMonth = $("#crop_imonth").text();
    var iYear = $("#crop_iyear").text();
    $('#ref_crop_table td').parent().remove();

    $.ajax({
        url: serverpath + '/Refinery/load_data_ref_crop_sdate/',

        data: {
            sdate: sdate,
            blockid: blockid,
            monthyear: monthyear,
            iMonth: iMonth,
            iYear: iYear

        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var shift = value.REFTH_StartShiftId == null ? "-" : value.REFTH_StartShiftId;
                var REFTH_ElapsedKAH = value.REFTH_ElapsedKAH == null ? "-" : value.REFTH_ElapsedKAH;


                $('#ref_crop_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockPair + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_CropNo + '</td>'
                    + '<td class="dfault_crop">' + REFTH_ElapsedKAH + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateStart) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateEnd) + '</td>'
                    + '<td class="dfault_crop">' + shift + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + value.REFTH_CropId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + value.REFTH_CropId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_crop_table', 30);
            });
        }
    });

}

function load_data_ref_crop_block() {

    var blockid = $('#search_shortscrop').val();
    var monthyear = $('#ref_crop_date').val();
    var iMonth = $("#crop_imonth").text();
    var iYear = $("#crop_iyear").text();
    $('#ref_crop_table td').parent().remove();

    $.ajax({
        url: serverpath + '/Refinery/load_data_ref_crop_block/',

        data: {

            blockid: blockid,
            monthyear: monthyear,
            iMonth: iMonth,
            iYear: iYear

        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var shift = value.REFTH_StartShiftId == null ? "-" : value.REFTH_StartShiftId;
                var REFTH_ElapsedKAH = value.REFTH_ElapsedKAH == null ? "-" : value.REFTH_ElapsedKAH;

                $('#ref_crop_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockPair + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_CropNo + '</td>'
                    + '<td class="dfault_crop">' + REFTH_ElapsedKAH + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateStart) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateEnd) + '</td>'
                    + '<td class="dfault_crop">' + shift + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + value.REFTH_CropId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + value.REFTH_CropId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_crop_table', 30);
            });
        }
    });

}

function load_block_prod_plan_month() {
    var monthyear = $('#ref_rppm_date').val();
    $.ajax({
        url: serverpath + '/Refinery/REFTH_ProdPlan_GetPrevMonth_SP_load/',
        data: { monthyear: monthyear },
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#rppmothly_crop1_data_tbl td').parent().remove();
            $('#rppmothly_crop2_data_tbl td').parent().remove();
            $('#rppmothly_crop3_data_tbl td').parent().remove();
            $('#rppmothly_crop4_data_tbl td').parent().remove();
            $.each(data, function (index, value) {

                var REFTH_ExchDate = value.REFTH_ExchDate == null ? "" : value.REFTH_ExchDate;
                var NewCrop = value.NewCrop == null ? "" : value.NewCrop;
                var AnodeChargedMT = value.AnodeChargedMT == null ? "" : value.AnodeChargedMT;
                var AnodeWt = value.AnodeWt == null ? "" : value.AnodeWt;
                var REFTH_ElapsedKAH = value.REFTH_ElapsedKAH == null ? "" : value.REFTH_ElapsedKAH;
                var CurrentEff = value.CurrentEff == null ? "" : value.CurrentEff;
                var RequiredKAH = value.RequiredKAH == null ? "" : value.RequiredKAH;
                var RequiredKAHDateTime = value.RequiredKAHDateTime == null ? "" : value.RequiredKAHDateTime;
                var ScrapRatio = value.ScrapRatio == null ? "" : value.ScrapRatio;
                var NetKAH = value.NetKAH == null ? "" : value.NetKAH;

                $('#rppmothly_crop1_data_tbl tr:last').after('<tr id="rppmtr_' + value.REFTH_BlockNo + '_' + value.REFTH_BlockPairId + '">'
                        + '<td class="dfault_crop"><input id="ppm_1_excdate_1_' + value.REFTH_BlockNo + '_crop_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input rppm_datetime" readonly="readonly"  value="' + format_RP_Dateonly(REFTH_ExchDate) + '"/></td>'
                        + '<td class="rfc_tbltd">' + value.REFTH_BlockNo + '</td>'
                        + '<td class="dfault_crop"><input id="ppm_2_cropno_1_' + value.REFTH_BlockNo + '_crop_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input rppm_datetime" readonly="readonly" value="' + NewCrop + '"/></td>'
                        + '<td class="dfault_crop"><input id="ppm_3_crop_1_' + value.REFTH_BlockNo + '_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value="' + NetKAH + '"/></td>'
                        + '<td class="dfault_crop"><input id="ppm_4_crop_1_' + value.REFTH_BlockNo + '_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input rppm_datetime" onkeypress="return NumericOnly(event)" value="' + AnodeChargedMT + '" readonly="readonly" /></td>'
                        + '<td class="dfault_crop"><input id="ppm_5_crop_1_' + value.REFTH_BlockNo + '_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input rppm_datetime" onkeypress="return NumericOnly(event)" value="' + AnodeWt + '" readonly="readonly" /></td>'
                        + '<td class="dfault_crop"><input id="ppm_6_crop_1_' + value.REFTH_BlockNo + '_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value="' + REFTH_ElapsedKAH + '"/></td>'
                        + '<td class="dfault_crop"><input id="ppm_7_crop_1_' + value.REFTH_BlockNo + '_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value="' + CurrentEff + '"/></td>'
                        + '<td class="dfault_crop"><input id="ppm_8_crop_1_' + value.REFTH_BlockNo + '_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value="' + RequiredKAH + '"/></td>'
                        //+ '<td class="dfault_crop"><input id="ppm_9_datecrop_1_' + value.REFTH_BlockNo + '_datetime_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input rppm_datetime" readonly="readonly" onclick="load_popup_rppeditdate(' + value.REFTH_BlockNo + ');return false;" value="' + formatDate(REFTH_ExchDate) + '"/></td>'
                        + '<td class="dfault_crop"><input id="ppm_9_datecrop_1_' + value.REFTH_BlockNo + '_datetime_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input rppm_datetime" readonly="readonly" value="' + formatDate(REFTH_ExchDate) + '"/></td>'
                      + '<td class="dfault_crop"><input id="ppm_10_crop_1_' + value.REFTH_BlockNo + '_' + value.REFTH_BlockPairId + '" type="text" class="extratbl_input rppm_datetime" onkeypress="return NumericOnly(event)" value="' + ScrapRatio + '" readonly="readonly"  /></td>'
                       //+ '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + 1 + ');return false;">Delete</a></td>'
                       //+ '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + 1 + ');return false;">Edit</a></td></tr>'   
                       );
                //$('#rppmothly_crop2_data_tbl tr:last').after('<tr class="rppmtr">'
                //       + '<td class="rfc_tbltd">' + value.REFTH_BlockNo + '</td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '_crop" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '_datetime" type="text" class="extratbl_input rppm_datetime" readonly="readonly" onclick="load_popup_rppeditdate(' + value.REFTH_BlockId + ');return false;"/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //      //+ '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + 1 + ');return false;">Delete</a></td>'
                //      //+ '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + 1 + ');return false;">Edit</a></td></tr>'
                //      );
                //$('#rppmothly_crop3_data_tbl tr:last').after('<tr class="rppmtr">'
                //       + '<td class="rfc_tbltd">' + value.REFTH_BlockNo + '</td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '_crop" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '_datetime" type="text" class="extratbl_input rppm_datetime" readonly="readonly" onclick="load_popup_rppeditdate(' + value.REFTH_BlockId + ');return false;"/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //      //+ '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + 1 + ');return false;">Delete</a></td>'
                //      //+ '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + 1 + ');return false;">Edit</a></td></tr>'
                //      );
                //$('#rppmothly_crop4_data_tbl tr:last').after('<tr class="rppmtr">'
                //       + '<td class="rfc_tbltd">' + value.REFTH_BlockNo + '</td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '_crop" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '_datetime" type="text" class="extratbl_input rppm_datetime" readonly="readonly" onclick="load_popup_rppeditdate(' + value.REFTH_BlockId + ');return false;"/></td>'
                //       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                //      //+ '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + 1 + ');return false;">Delete</a></td>'
                //      //+ '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + 1 + ');return false;">Edit</a></td></tr>'
                //      );

                $(document).ready(function () {

                    //$("#ppm_1_excdate_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").keyup(function () {
                    //    getScrapRatio($(this).attr('id'));
                    //});
                    //$("#ppm_2_cropno_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").keyup(function () {
                    //    getScrapRatio($(this).attr('id'));
                    //});
                    $("#ppm_3_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                        //getScrapRatio($(this).attr('id'));
                        //getKAHdate();
                    });
                    $("#ppm_4_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                        getScrapRatio($(this).attr('id'));
                    });
                    //$("#ppm_5_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                    //    getScrapRatio($(this).attr('id'));
                    //});
                    $("#ppm_6_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                        getScrapRatio($(this).attr('id'));
                    });
                    $("#ppm_7_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                        getScrapRatio($(this).attr('id'));
                    });
                    $("#ppm_8_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                        getScrapRatio($(this).attr('id'));
                        //getKAHdate();
                    });
                    //$("#ppm_9_datecrop_1_" + value.REFTH_BlockId + "_datetime_" + value.REFTH_BlockPairId + "").keyup(function () {
                    //    getScrapRatio($(this).attr('id'));
                    //});
                    //$("#ppm_10_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                    //    getScrapRatio($(this).attr('id'));
                    //});

                    //get the scrap ratio % upon changing the value of Current value of inputs in table
                    function getScrapRatio(id) {
                        $("#rppmothly_crop1_data_tbl").each(function () {

                            var REFTH_AnodeCharged_MT = $("#ppm_4_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").val();
                            var REFTH_ElapsedKAH = $("#ppm_6_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").val();
                            var REFTH_CurrentEff = $("#ppm_7_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").val();
                            var REFTH_RequiredKAH = $("#ppm_8_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").val();
                            var rppm_curreff = $("#rppm_curreff_9").val() / 100;

                            var totalscrap = (REFTH_AnodeCharged_MT - (REFTH_ElapsedKAH * REFTH_CurrentEff / parseInt(100) + REFTH_RequiredKAH * rppm_curreff) / parseInt(1000) * parseFloat(1.185) * parseFloat(1.015) * parseInt(14)) / REFTH_AnodeCharged_MT * parseInt(100)

                            var REFTH_ScrapRatio = $("#ppm_10_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").val(totalscrap.toFixed(2));

                            //$("#ppm_10_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").closest('tr').addClass('change');
                            //$("#ppm_10_crop_1_" + value.REFTH_BlockNo + "_" + value.REFTH_BlockPairId + "").closest('tr').css({ 'background-color': '#ffffcc !important' });
                        });
                    }
                });

            });
            var date = $('#ref_rppm_date').val();
            navigate_cursor_with_arrow_keys();
            input_rppmonth_change("#rppmothly_crop1_data_tbl");

        }, complete: function () {
            load_data_prod_plan_month();
        }
    });
}


function load_data_prod_plan_month() {
    //$('#rppmothly_crop1_data_tbl').find('input[id*="ppm_"]').each(function () {
    //    $(this).val("");
    //});
    //$('#rppmothly_crop2_data_tbl').find('input[id*="ppm_"]').each(function () {
    //    $(this).val("");
    //});
    //$('#rppmothly_crop3_data_tbl').find('input[id*="ppm_"]').each(function () {
    //    $(this).val("");
    //});
    //$('#rppmothly_crop4_data_tbl').find('input[id*="ppm_"]').each(function () {
    //    $(this).val("");
    //});
    var monthyear = $('#ref_rppm_date').val();
    $('.ajax-loader').css("visibility", "visible");
    $.ajax({
        url: serverpath + '/Refinery/load_data_prod_plan_monthdata/',
        data: { monthyear: monthyear },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var REFTH_ExchangeDate = value.REFTH_ExchangeDate == null ? "" : value.REFTH_ExchangeDate;
                var REFTH_CropNo = value.REFTH_CropNo == null ? "" : value.REFTH_CropNo;
                var REFTH_NetKAH = value.REFTH_NetKAH == null ? "" : value.REFTH_NetKAH;
                var REFTH_AnodeCharged_MT = value.REFTH_AnodeCharged_MT == null ? "" : value.REFTH_AnodeCharged_MT;
                var REFTH_AnodeWtPc = value.REFTH_AnodeWtPc == null ? "" : value.REFTH_AnodeWtPc;
                var REFTH_ElapsedKAH = value.REFTH_ElapsedKAH == null ? "" : value.REFTH_ElapsedKAH;
                var REFTH_CurrentEff = value.REFTH_CurrentEff == null ? "" : value.REFTH_CurrentEff;
                var REFTH_RequiredKAH = value.REFTH_RequiredKAH == null ? "" : value.REFTH_RequiredKAH;
                var REFTH_KAHDatetmp = value.REFTH_KAHDate == null ? "" : value.REFTH_KAHDate;
                var REFTH_ScrapRatio = value.REFTH_ScrapRatio == null ? "" : value.REFTH_ScrapRatio;

                var REFTH_ExchangeDate = $("#ppm_1_excdate_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").val(format_RP_Dateonly(REFTH_ExchangeDate));
                var REFTH_CropNo = $("#ppm_2_cropno_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").val(REFTH_CropNo);
                var REFTH_NetKAH = $("#ppm_3_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val(REFTH_NetKAH);
                var REFTH_AnodeCharged_MT = $("#ppm_4_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val(REFTH_AnodeCharged_MT);
                var REFTH_AnodeWtPc = $("#ppm_5_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val(REFTH_AnodeWtPc);
                var REFTH_ElapsedKAH = $("#ppm_6_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val(REFTH_ElapsedKAH);
                var REFTH_CurrentEff = $("#ppm_7_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val(REFTH_CurrentEff);
                var REFTH_RequiredKAH = $("#ppm_8_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val(REFTH_RequiredKAH);
                var REFTH_KAHDatetmp = $("#ppm_9_datecrop_1_" + value.REFTH_BlockId + "_datetime_" + value.REFTH_BlockPairId + "").val(formatDate(REFTH_KAHDatetmp));
                var REFTH_ScrapRatio = $("#ppm_10_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val(REFTH_ScrapRatio);

                $(document).ready(function () {

                    //$("#ppm_1_excdate_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").keyup(function () {
                    //    getScrapRatio($(this).attr('id'));
                    //});
                    //$("#ppm_2_cropno_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").keyup(function () {
                    //    getScrapRatio($(this).attr('id'));
                    //});
                    $("#ppm_3_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                        //getScrapRatio($(this).attr('id'));
                        getKAHdate();
                    });
                    $("#ppm_4_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                        getScrapRatio($(this).attr('id'));
                    });
                    //$("#ppm_5_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                    //    getScrapRatio($(this).attr('id'));
                    //});
                    $("#ppm_6_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                        getScrapRatio($(this).attr('id'));
                    });
                    $("#ppm_7_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                        getScrapRatio($(this).attr('id'));
                    });
                    $("#ppm_8_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                        getScrapRatio($(this).attr('id'));
                        getKAHdate();
                    });
                    //$("#ppm_9_datecrop_1_" + value.REFTH_BlockId + "_datetime_" + value.REFTH_BlockPairId + "").keyup(function () {
                    //    getScrapRatio($(this).attr('id'));
                    //});
                    //$("#ppm_10_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").keyup(function () {
                    //    getScrapRatio($(this).attr('id'));
                    //});

                    //get the scrap ratio % upon changing the value of Current value of inputs in table
                    function getScrapRatio(id) {
                        $("#rppmothly_crop1_data_tbl").each(function () {

                            var REFTH_AnodeCharged_MT = $("#ppm_4_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val();
                            var REFTH_ElapsedKAH = $("#ppm_6_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val();
                            var REFTH_CurrentEff = $("#ppm_7_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val();
                            var REFTH_RequiredKAH = $("#ppm_8_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val();
                            var rppm_curreff = $("#rppm_curreff_9").val() / 100;

                            var totalscrap = (REFTH_AnodeCharged_MT - (REFTH_ElapsedKAH * REFTH_CurrentEff / parseInt(100) + REFTH_RequiredKAH * rppm_curreff) / parseInt(1000) * parseFloat(1.185) * parseFloat(1.015) * parseInt(14)) / REFTH_AnodeCharged_MT * parseInt(100)

                            var REFTH_ScrapRatio = $("#ppm_10_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val(totalscrap.toFixed(2));

                            //$("#ppm_10_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").closest('tr').addClass('change');
                            //$("#ppm_3_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#ffffcc !important' });
                            //$("#ppm_6_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#ffffcc !important' });
                            //$("#ppm_7_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#ffffcc !important' });
                            //$("#ppm_8_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#ffffcc !important' });
                            
                            //$("#ppm_1_excdate_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                            //$(".rfc_tbltd").css({ 'background-color': '#fafafa  !important' });
                            //$("#ppm_2_cropno_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                            //$("#ppm_4_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                            //$("#ppm_5_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                            //$("#ppm_9_datecrop_1_" + value.REFTH_BlockId + "_datetime_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                            //$("#ppm_10_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                            
                        });
                    }

                    function getKAHdate() {
                        //formula for date 
                        var REFTH_ExchangeDate = new Date($("#ppm_1_excdate_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").val()) == "" ? new Date("1/1/1901") : new Date($("#ppm_1_excdate_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").val());
                        var curset_adjustmt = new Date($("#rppmt_curset_adjustment_4").val()) == "" ? new Date("1/1/1901") : new Date($("#rppmt_curset_adjustment_4").val());
                        var curset_adjustmtt = $("#rppmt_curset_adjustment_4").val() == "" ? "1/1/1901" : $("#rppmt_curset_adjustment_4").val();
                        var spltparamm = curset_adjustmtt.split("/");
                        var yyy = spltparamm[2];
                        var mmm = spltparamm[0];
                        var ddd = spltparamm[1];

                        var curset_adjustment = new Date($("#rppmt_curset_adjustment_4").val()) == "" ? new Date("1/1/1901") : new Date($("#rppmt_curset_adjustment_4").val());
                        var s_hr = $("#start_time_hr_ref_edit_act_4").val();
                        var s_min = $("#start_time_min_ref_edit_act_4").val();
                        add_start_date_ = curset_adjustment.add({
                            minutes: s_min,
                            hours: s_hr
                        });
                        var beginn = new Date(0, 0, 1); // 1900 based date
                        var dttt = new Date(yyy, mmm - 1, ddd, s_hr, s_min); // the date



                        var EffectiveCurrentUsedkA = $("#rppm_effcursetka_5").val();
                        var REFTH_RequiredKAH = $("#ppm_8_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val() == "" ? 0 : $("#ppm_8_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val();

                        var DateReadingTaken = new Date($("#rppmt_monthly_date_1").val());
                        var s_hrs = $("#start_time_hr_ref_edit_act_1").val();
                        var s_mins = $("#start_time_min_ref_edit_act_1").val();
                        add_start_dates_ = DateReadingTaken.add({
                            minutes: s_mins,
                            hours: s_hrs
                        });

                        var rppm_cursetka = $("#rppm_cursetka_2").val();
                        var REFTH_NetKAH = $("#ppm_3_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val() == "" ? 0 : $("#ppm_3_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val();

                        var datecomp, datecomp1, datecomp2, datecomp3, datecomp4, datecomp5, datecomp6;
                        var valof = $("#rppmt_monthly_date_1").val() == "" ? "1/1/1901" : $("#rppmt_monthly_date_1").val();
                        var spltparam = valof.split("/");
                        var yy = spltparam[2];
                        var mm = spltparam[0];
                        var dd = spltparam[1];

                        var begin = new Date(0, 0, 1); // 1900 based date
                        var dtt = new Date(yy, mm - 1, dd, s_hrs, s_mins); // the date

                        //get the serial number of date like excel
                        var DateReadingTkn = 2 + (dtt.getTime() - begin.getTime()) / (1000 * 60 * 60 * 24);
                        var cusetasj = 2 + (dttt.getTime() - beginn.getTime()) / (1000 * 60 * 60 * 24);

                        if (REFTH_ExchangeDate <= curset_adjustmt) {

                            //breakdown to get the exact value from original formula =(DateReadingTkn - (s_hrs / 24)) + (((s_hrs) + (REFTH_RequiredKAH - REFTH_NetKAH) / rppm_cursetka) / 24)
                            datecomp1 = parseFloat(s_hrs) / parseFloat(24)
                            datecomp2 = parseFloat(DateReadingTkn) - parseFloat(datecomp1);
                            datecomp3 = parseFloat(REFTH_RequiredKAH) - parseFloat(REFTH_NetKAH);
                            datecomp4 = parseFloat(datecomp3) / parseFloat(rppm_cursetka);
                            datecomp5 = parseFloat(datecomp4) + parseFloat(s_hrs);
                            datecomp6 = parseFloat(datecomp5) / parseFloat(24);
                            datecomp7 = parseFloat(datecomp2) + parseFloat(datecomp6);
                            datecomp = datecomp7.toFixed(5);

                        } else {

                            if (EffectiveCurrentUsedkA > 0) {

                                var a, b, c, d, e, f, g, h, i, j, k, l, m, n;

                                if (cusetasj == 367) {
                                    var cusetasjj = 0;
                                    //breakdown to get the exact value from original formula datecomp = (cusetasj - (s_hr / 24)) + ((s_hr + ((REFTH_RequiredKAH - (((cusetasj - DateReadingTkn) 
                                    //* 24 * rppm_cursetka) + REFTH_NetKAH)) / EffectiveCurrentUsedkA)) / 24)

                                    a = (parseFloat(s_hr) / parseFloat(24));
                                    b = parseFloat(cusetasjj) - parseFloat(a);
                                    c = cusetasjj - DateReadingTkn;
                                    k = parseFloat(24) * parseFloat(rppm_cursetka);
                                    d = parseFloat(c) * k;
                                    e = parseFloat(d) + parseFloat(REFTH_NetKAH);
                                    f = parseFloat(REFTH_RequiredKAH) - parseFloat(e);
                                    g = parseFloat(f) / parseFloat(EffectiveCurrentUsedkA);
                                    h = parseFloat(s_hr) + parseFloat(g);
                                    i = parseFloat(h) / parseFloat(24);
                                    j = parseFloat(b) + parseFloat(i);
                                    datecomp = j;

                                } else {
                                    //breakdown to get the exact value from original formula datecomp = (cusetasj - (s_hr / 24)) + ((s_hr + ((REFTH_RequiredKAH - (((cusetasj - DateReadingTkn) 
                                    //* 24 * rppm_cursetka) + REFTH_NetKAH)) / EffectiveCurrentUsedkA)) / 24)

                                    a = (parseFloat(s_hr) / parseFloat(24));
                                    b = parseFloat(cusetasj) - parseFloat(a);
                                    c = cusetasj - DateReadingTkn;
                                    k = parseFloat(24) * parseFloat(rppm_cursetka);
                                    d = parseFloat(c) * k;
                                    e = parseFloat(d) + parseFloat(REFTH_NetKAH);
                                    f = parseFloat(REFTH_RequiredKAH) - parseFloat(e);
                                    g = parseFloat(f) / parseFloat(EffectiveCurrentUsedkA);
                                    h = parseFloat(s_hr) + parseFloat(g);
                                    i = parseFloat(h) / parseFloat(24);
                                    j = parseFloat(b) + parseFloat(i);
                                    datecomp = j;
                                }
                            } else {

                                //breakdown to get the exact value from original formula =(DateReadingTkn - (s_hrs / 24)) + (((s_hrs) + (REFTH_RequiredKAH - REFTH_NetKAH) / rppm_cursetka) / 24)
                                datecomp1 = parseFloat(s_hrs) / parseFloat(24)
                                datecomp2 = parseFloat(DateReadingTkn) - parseFloat(datecomp1);
                                datecomp3 = parseFloat(REFTH_RequiredKAH) - parseFloat(REFTH_NetKAH);
                                datecomp4 = parseFloat(datecomp3) / parseFloat(rppm_cursetka);
                                datecomp5 = parseFloat(datecomp4) + parseFloat(s_hrs);
                                datecomp6 = parseFloat(datecomp5) / parseFloat(24);
                                datecomp7 = parseFloat(datecomp2) + parseFloat(datecomp6);
                                datecomp = datecomp7.toFixed(5);
                            }
                        }
                        //convert the number to date like excel
                        var date = new Date((datecomp - (25567 + 2)) * 86400 * 1000);
                        var localTime = new Date(date.getTime() + (new Date()).getTimezoneOffset() * 60000);

                        var mins;
                        var datetime;

                        if (localTime.getMinutes() <= 9) {

                            mins = "0" + localTime.getMinutes();
                        } else {
                            mins = localTime.getMinutes();
                        }

                        if (localTime.getDate <= 9) {

                            datetime = "0" + localTime.getDate();
                        } else {
                            datetime = localTime.getDate();
                        }

                        var thisdate = parseInt(localTime.getMonth() + 1) + "/" + parseInt(datetime) + "/" + yy + " " + localTime.getHours() + ":" + mins;
                        $("#ppm_9_datecrop_1_" + value.REFTH_BlockId + "_datetime_" + value.REFTH_BlockPairId + "").val(thisdate);

                        //$("#ppm_9_datecrop_1_" + value.REFTH_BlockId + "_datetime_" + value.REFTH_BlockPairId + "").closest('tr').addClass('changed');
                    }
                    getKAHdate();
                });

                //get the scrap ratio % upon changing the value of Current Efficiency in the header 
                var REFTH_AnodeCharged_MT = $("#ppm_4_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val();
                var REFTH_ElapsedKAH = $("#ppm_6_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val();
                var REFTH_CurrentEff = $("#ppm_7_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val();
                var REFTH_RequiredKAH = $("#ppm_8_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val();
                var rppm_curreff = $("#rppm_curreff_9").val() / 100;

                var totalscrap = (REFTH_AnodeCharged_MT - (REFTH_ElapsedKAH * REFTH_CurrentEff / parseInt(100) + REFTH_RequiredKAH * rppm_curreff) / parseInt(1000) * parseFloat(1.185) * parseFloat(1.015) * parseInt(14)) / REFTH_AnodeCharged_MT * parseInt(100)

                var REFTH_ScrapRatio = $("#ppm_10_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").val(totalscrap.toFixed(2));
                
                //$("#ppm_10_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").closest('tr').addClass('change');
                //$("#ppm_3_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#ffffcc !important' });
                //$("#ppm_6_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#ffffcc !important' });
                //$("#ppm_7_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#ffffcc !important' });
                //$("#ppm_8_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#ffffcc !important' });

                //$("#ppm_1_excdate_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                //$(".rfc_tbltd").css({ 'background-color': '#fafafa  !important' });
                //$("#ppm_2_cropno_1_" + value.REFTH_BlockId + "_crop_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                //$("#ppm_4_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                //$("#ppm_5_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                //$("#ppm_9_datecrop_1_" + value.REFTH_BlockId + "_datetime_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });
                //$("#ppm_10_crop_1_" + value.REFTH_BlockId + "_" + value.REFTH_BlockPairId + "").css({ 'background-color': '#fafafa  !important' });


            });

        },
        complete: function () {
            //get_empty_block();
            $('.ajax-loader').css("visibility", "hidden");
        }
    });
}

function get_empty_block() {

    $('#rppmothly_crop1_data_tbl').find('input[id*="ppm_9_datecrop_1_"]').each(function () {
        if ($(this).val() == null || $(this).val() == "") {
            $(this).closest('tr').remove();
        }
    });
}

function load_block_prod_plan_daily() {

    $.ajax({
        url: serverpath + '/Refinery/load_block_prod_plan_month/',
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#rpp_tbl_daily td').parent().remove();
            $.each(data, function (index, value) {
                $('#rpp_tbl_daily tr:last').after('<tr class="rppmtr">'
                        + '<td class="rfc_tbltd">' + value.REFTH_BlockNo + '</td>'
                        + '<td class="dfault_crop"><input id="ppd_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_5_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_5_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_5_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'

                        + '<td class="dfault_crop"><input id="ppd_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_5_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_6_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_7_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_8_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_9_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_10_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_11_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_12_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_13_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_14_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_15_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_16_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_17_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_18_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_19_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_20_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_21_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_22_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_23_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_24_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_25_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_26_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_27_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_28_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_29_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_30_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_31_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_32_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_33_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_34_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_35_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_36_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_37_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_38_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_39_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_40_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_41_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_42_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_43_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_44_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_45_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_46_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_47_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_48_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_49_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_50_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_51_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_52_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_53_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_54_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_55_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_56_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_57_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_58_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_59_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_60_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_61_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_62_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_63_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_64_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_65_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_66_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_67_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_68_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_69_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_70_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_71_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_72_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_73_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_74_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_75_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_76_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_77_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_78_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_79_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_80_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_81_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_82_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_83_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_84_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_85_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_86_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_87_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_88_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_89_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_90_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_91_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_92_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_93_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_94_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_95_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_96_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppdremarks_97_' + value.REFTH_BlockId + '" type="text" class="extratbl_input"  value=""/></td>'
                //+ '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + 1 + ');return false;">Delete</a></td>'
                //+ '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + 1 + ');return false;">Edit</a></td></tr>'
                       );

            });
            navigate_cursor_with_arrow_keys();
        }
    });
}

function upperCaseF(a) {
    a.value = a.value.toUpperCase();
    check_rpp_input($(a).val(), $(a));
}

function check_limit_rppd_input(input, dom) {
    var isValid = true;
    var count = 0;

    var isBreak = false;
    var $this = dom;

    var $prev_td = $this.closest('td').prev('td');
    var prev_td_val = $prev_td.find('input').val();
    if (input.indexOf(prev_td_val) > -1 && prev_td_val != "") {
        isValid = false;
    }

    return isValid;
}

function load_refineryproducitonplan_graph() {
    $("#load_production_by_block").val(0);
    drawChart_plan();
    // drawChart_actual();
    drawChart_MachineDowntime();
}

function load_production_by_block() {
    drawChart_planbyblock();
    //drawChart_actualbyblock();
}

//----production plan chart function-----//
//    'ST': '#00b300',//GREEN
//    'CP': '#ffea00',//YELLOW
//    'EF': '#cc0000',//RED
//    'LT': '#0080ff',//BLUE
//    'AC': '#a5682a',//BROWN
//    'MD': '#861286',//VIOLET
//    'KR': '#ffa500',//ORANGE
//   'OFF': '#000000'//BLACK


//load  graph production daily by date
function drawChart_plan() {

    var container = document.getElementById('timeLineGraph_plan');
    var chart = new google.visualization.Timeline(container);

    var select_date = $('#rpp_daily_date').val();
    $('.ajax-loader').css("visibility", "visible");
    $.ajax({
        url: serverpath + '/Refinery/REFTH_PRODACTIVITY_LOADSAVEDATA/',
        data: {
            select_date: select_date,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $('.ajax-loader').css("visibility", "visible");
            $.ajax({
                url: serverpath + '/Refinery/REFTH_PRODACTIVITY_LOADDATA/',
                data: {
                    select_date: select_date,
                },
                type: 'POST',
                cache: false,
                success: function (data) {

                    if (data.length != 0) {
                        $(".ref_text_label").removeAttr('style');
                        var dataTable = new google.visualization.DataTable();
                        // assumes "word" is a string and "count" is a number
                        dataTable.addColumn({ type: 'string', id: 'Role' });
                        dataTable.addColumn({ type: 'string', id: 'Name' });
                        dataTable.addColumn({ type: 'string', role: 'style' });
                        dataTable.addColumn({ type: 'date', id: 'Start' });
                        dataTable.addColumn({ type: 'date', id: 'End' });
                        var flag;
                        $.each(data, function (index, value) {

                            var str_sdate = format_RP_Date(value.StartTime);
                            var sdate = str_sdate.split(',');
                            var str_edate = format_RP_Date(value.EndTime);
                            var edate = str_edate.split(',');
                            var REFTH_Streamname = value.REFTH_Streamname == "Default" ? " " : value.REFTH_Streamname;

                            if (value.REFTH_Flag == 1) {
                                flag = "Plan";
                            } else {
                                flag = "Actual";
                            }

                            dataTable.addRow([' Block ' + value.REFTH_BlockId + " " + REFTH_Streamname + " " + flag, value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);

                        });

                        var rowHeight = 50;
                        var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                        var options = {
                            timeline: {
                                groupByRowLabel: true,
                                rowLabelStyle: {
                                    fontName: 'verdana',
                                    fontSize: 12,
                                    color: '#333333'
                                },
                                barLabelStyle: {
                                    fontName: 'verdana',
                                    fontSize: 12
                                }
                            },
                            avoidOverlappingGridLines: true,
                            height: chartHeight,
                            //width: '500px',
                        };

                        var view = new google.visualization.DataView(dataTable);
                        view.setColumns([0, 1, 2, 3, 4, ]);

                        chart.draw(dataTable, options);
                        google.visualization.events.addListener(chart, 'select', click_edit);
                        function click_edit() {
                            var selection = chart.getSelection();
                            var message = '';
                            var rowno = '';
                            for (var i = 0; i < selection.length; i++) {
                                var item = selection[i];
                                if (item.row != null && item.column != null) {
                                    var str = dataTable.getFormattedValue(item.row, item.column);
                                    message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                                    rowno += item.row;
                                } else if (item.row != null) {
                                    var str = dataTable.getFormattedValue(item.row, 0);
                                    message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                                    rowno += item.row;
                                } else if (item.column != null) {
                                    var str = dataTable.getFormattedValue(0, item.column);
                                    message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                                    rowno += item.row;
                                }
                            }
                            if (message == '') {
                                message = 'nothing';
                            }
                            //edit_prodact_direct_data_duration(rowno, select_date)
                            load_Refinery_prodact_option(rowno, select_date);
                        }
                    } else {
                        $("#timeLineGraph_plan").text("Nothing to display.");
                    }
                }, complete: function () {
                    $('.ajax-loader').css("visibility", "hidden");
                }
            });

        }
    });


    //var container = document.getElementById('timeLineGraph');
    //var chart = new google.visualization.Timeline(container);
    //var dataTable = new google.visualization.DataTable();

    //dataTable.addColumn({ type: 'string', id: 'Role' });
    //dataTable.addColumn({ type: 'string', id: 'Name' });
    //dataTable.addColumn({ type: 'string', role: 'style' });
    //dataTable.addColumn({ type: 'date', id: 'Start' });
    //dataTable.addColumn({ type: 'date', id: 'End' }); 
    //str_startdate = startdate.replace(/^"|"$/g, '');
    //str_enddate = enddate.replace(/^"|"$/g, '');

    //dataTable.addRows([

    //   [block, actcode, colorstyle, new Date(2017, 01, 1, 8, 03), new Date(2017, 01, 1, 8, 05)]

    //['Block #1', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #1', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #1', 'LT', '#0080ff', new Date(2017, 0, 1, 7), new Date(2017, 0, 1, 9)],

    //['Block #1', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #1', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #1', 'LT', '#0080ff', new Date(2017, 0, 1, 7), new Date(2017, 0, 1, 9)],

    //['Block #2', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #2', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #2', 'EF', '#cc0000', new Date(2017, 0, 1, 7, 12), new Date(2017, 0, 1, 8, 11)],

    //]);
    //var rowHeight = 41;
    //var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
    //var options = {
    //    timeline: {
    //        groupByRowLabel: true,
    //        rowLabelStyle: {
    //            fontName: 'Roboto Condensed',
    //            fontSize: 14,
    //            color: '#333333'
    //        },
    //        barLabelStyle: {
    //            fontName: 'Roboto Condensed',
    //            fontSize: 14
    //        }
    //    },
    //    avoidOverlappingGridLines: true,
    //    height: chartHeight,
    //    width: '100%',
    //};

    //chart.draw(dataTable, options);
}

//load  graph production daily by block
function drawChart_planbyblock() {

    var container = document.getElementById('timeLineGraph_plan');
    var chart = new google.visualization.Timeline(container);

    var select_date = $('#rpp_daily_date').val();
    var thisblock = $('#load_production_by_block').val();
    var streamid = $('#streamid').val();
    var production_type = $('#production_type').val();

    $.ajax({
        url: serverpath + '/Refinery/REFTH_PRODACTIVITY_LOADSAVEDATA_BLOCK/',
        data: {
            select_date: select_date,
            thisblock: thisblock,
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.ajax({
                url: serverpath + '/Refinery/REFTH_PRODACTIVITY_LOAD_PERBLOCK/',
                data: {
                    select_date: select_date,
                    thisblock: thisblock,
                    //streamid: streamid,
                    //production_type:production_type
                },
                type: 'POST',
                cache: false,
                success: function (data) {
                    if (data.length != 0) {
                        $(".ref_text_label").removeAttr('style');
                        var dataTable = new google.visualization.DataTable();
                        dataTable.addColumn({ type: 'string', id: 'Role' });
                        dataTable.addColumn({ type: 'string', id: 'Name' });
                        dataTable.addColumn({ type: 'string', role: 'style' });
                        dataTable.addColumn({ type: 'date', id: 'Start' });
                        dataTable.addColumn({ type: 'date', id: 'End' });
                        var flag;
                        $.each(data, function (index, value) {

                            var str_sdate = format_RP_Date(value.StartTime);
                            var sdate = str_sdate.split(',');
                            var str_edate = format_RP_Date(value.EndTime);
                            var edate = str_edate.split(',');
                            var REFTH_Streamname = value.REFTH_Streamname == "Default" ? " " : value.REFTH_Streamname;

                            if (value.REFTH_Flag == 1) {
                                flag = "Plan";
                            } else {
                                flag = "Actual";
                            }
                            dataTable.addRow([' Block ' + value.REFTH_BlockId + " " + REFTH_Streamname + " " + flag, value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);

                        });

                        var rowHeight = 50;
                        var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                        var options = {
                            timeline: {
                                groupByRowLabel: true,
                                rowLabelStyle: {
                                    fontName: 'verdana',
                                    fontSize: 12,
                                    color: '#333333'
                                },
                                barLabelStyle: {
                                    fontName: 'verdana',
                                    fontSize: 12
                                }
                            },
                            avoidOverlappingGridLines: true,
                            height: chartHeight,
                            //width: '500px',
                        };

                        var view = new google.visualization.DataView(dataTable);
                        view.setColumns([0, 1, 2, 3, 4, ]);

                        chart.draw(dataTable, options);
                        google.visualization.events.addListener(chart, 'select', click_edit);
                        function click_edit() {
                            var selection = chart.getSelection();
                            var message = '';
                            var rowno = '';
                            for (var i = 0; i < selection.length; i++) {
                                var item = selection[i];
                                if (item.row != null && item.column != null) {
                                    var str = dataTable.getFormattedValue(item.row, item.column);
                                    message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                                    rowno += item.row;
                                } else if (item.row != null) {
                                    var str = dataTable.getFormattedValue(item.row, 0);
                                    message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                                    rowno += item.row;
                                } else if (item.column != null) {
                                    var str = dataTable.getFormattedValue(0, item.column);
                                    message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                                    rowno += item.row;
                                }
                            }
                            if (message == '') {
                                message = 'nothing';
                            }
                            //edit_prodact_direct_data_duration(rowno, select_date)
                            load_Refinery_prodact_option(rowno, select_date)
                        }
                    } else {
                        $("#timeLineGraph_plan").text("Nothing to display.");
                    }
                }
            });
        }
    });
}

//load  graph production daily by stream
function drawChart_per_stream() {

    var container = document.getElementById('timeLineGraph_plan');
    var chart = new google.visualization.Timeline(container);

    var select_date = $('#rpp_daily_date').val();
    var thisblock = $('#load_production_by_block').val();
    var streamid = $('#streamid').val();
    var production_type = $('#production_type').val();

    $.ajax({
        url: serverpath + '/Refinery/REFTH_PRODACTIVITY_LOADSAVEDATA_STREAM/',
        data: {
            select_date: select_date,
            thisblock: thisblock,
            streamid: streamid,
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.ajax({
                url: serverpath + '/Refinery/REFTH_PRODACTIVITY_LOAD_PERSTREAM/',
                data: {
                    select_date: select_date,
                    thisblock: thisblock,
                    streamid: streamid,
                    //production_type:production_type
                },
                type: 'POST',
                cache: false,
                success: function (data) {
                    if (data.length != 0) {
                        $(".ref_text_label").removeAttr('style');
                        var dataTable = new google.visualization.DataTable();
                        dataTable.addColumn({ type: 'string', id: 'Role' });
                        dataTable.addColumn({ type: 'string', id: 'Name' });
                        dataTable.addColumn({ type: 'string', role: 'style' });
                        dataTable.addColumn({ type: 'date', id: 'Start' });
                        dataTable.addColumn({ type: 'date', id: 'End' });
                        var flag;
                        $.each(data, function (index, value) {

                            var str_sdate = format_RP_Date(value.StartTime);
                            var sdate = str_sdate.split(',');
                            var str_edate = format_RP_Date(value.EndTime);
                            var edate = str_edate.split(',');
                            var REFTH_Streamname = value.REFTH_Streamname == "Default" ? " " : value.REFTH_Streamname;

                            if (value.REFTH_Flag == 1) {
                                flag = "Plan";
                            } else {
                                flag = "Actual";
                            }
                            dataTable.addRow([' Block ' + value.REFTH_BlockId + " " + REFTH_Streamname + " " + flag , value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);

                        });

                        var rowHeight = 50;
                        var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                        var options = {
                            timeline: {
                                groupByRowLabel: true,
                                rowLabelStyle: {
                                    fontName: 'verdana',
                                    fontSize: 12,
                                    color: '#333333'
                                },
                                barLabelStyle: {
                                    fontName: 'verdana',
                                    fontSize: 12
                                }
                            },
                            avoidOverlappingGridLines: true,
                            height: chartHeight,
                            //width: '500px',
                        };

                        var view = new google.visualization.DataView(dataTable);
                        view.setColumns([0, 1, 2, 3, 4, ]);

                        chart.draw(dataTable, options);
                        google.visualization.events.addListener(chart, 'select', click_edit);
                        function click_edit() {
                            var selection = chart.getSelection();
                            var message = '';
                            var rowno = '';
                            for (var i = 0; i < selection.length; i++) {
                                var item = selection[i];
                                if (item.row != null && item.column != null) {
                                    var str = dataTable.getFormattedValue(item.row, item.column);
                                    message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                                    rowno += item.row;
                                } else if (item.row != null) {
                                    var str = dataTable.getFormattedValue(item.row, 0);
                                    message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                                    rowno += item.row;
                                } else if (item.column != null) {
                                    var str = dataTable.getFormattedValue(0, item.column);
                                    message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                                    rowno += item.row;
                                }
                            }
                            if (message == '') {
                                message = 'nothing';
                            }
                            //edit_prodact_direct_data_duration(rowno, select_date)
                            load_Refinery_prodact_option(rowno, select_date)
                        }
                    } else {
                        $("#timeLineGraph_plan").text("Nothing to display.");
                    }
                }, complete: function () {
                    $('.ajax-loader').css("visibility", "hidden");
                }
            });
        }
    });
}


function drawChart_actual() {

    var container = document.getElementById('timeLineGraph_actual');
    var chart = new google.visualization.Timeline(container);

    var select_date = $('#rpp_daily_date').val();

    $.ajax({
        url: serverpath + '/Refinery/get_productionplan_graphdata_Actual/',
        data: {
            select_date: select_date,
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.ajax({
                url: serverpath + '/Refinery/REFTH_PRODACTIVITY_LOADDATA_PLAN/',
                data: {
                    select_date: select_date,
                },
                type: 'POST',
                cache: false,
                success: function (data) {

                    if (data.length != 0) {
                        $(".ref_text_label").removeAttr('style');
                        var dataTable = new google.visualization.DataTable();
                        // assumes "word" is a string and "count" is a number
                        dataTable.addColumn({ type: 'string', id: 'Role' });
                        dataTable.addColumn({ type: 'string', id: 'Name' });
                        dataTable.addColumn({ type: 'string', role: 'style' });
                        dataTable.addColumn({ type: 'date', id: 'Start' });
                        dataTable.addColumn({ type: 'date', id: 'End' });


                        $.each(data, function (index, value) {

                            var str_sdate = format_RP_Date(value.StartTime);
                            var sdate = str_sdate.split(',');
                            var str_edate = format_RP_Date(value.EndTime);
                            var edate = str_edate.split(',');

                            dataTable.addRow([' Block ' + value.REFTH_BlockId, value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);

                        });

                        var rowHeight = 320;
                        var chartHeight = (dataTable.getNumberOfRows() + 1) + rowHeight;
                        var options = {
                            timeline: {
                                groupByRowLabel: true,
                                rowLabelStyle: {
                                    fontName: 'verdana',
                                    fontSize: 12,
                                    color: '#333333'
                                },
                                barLabelStyle: {
                                    fontName: 'verdana',
                                    fontSize: 12
                                }
                            },
                            avoidOverlappingGridLines: true,
                            height: chartHeight,
                            //width: '500px',
                        };

                        var view = new google.visualization.DataView(dataTable);
                        view.setColumns([0, 1, 2, 3, 4, ]);

                        chart.draw(dataTable, options);
                        google.visualization.events.addListener(chart, 'select', click_edit);
                        function click_edit() {
                            var selection = chart.getSelection();
                            var message = '';
                            var rowno = '';
                            for (var i = 0; i < selection.length; i++) {
                                var item = selection[i];
                                if (item.row != null && item.column != null) {
                                    var str = dataTable.getFormattedValue(item.row, item.column);
                                    message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                                    rowno += item.row;
                                } else if (item.row != null) {
                                    var str = dataTable.getFormattedValue(item.row, 0);
                                    message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                                    rowno += item.row;
                                } else if (item.column != null) {
                                    var str = dataTable.getFormattedValue(0, item.column);
                                    message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                                    rowno += item.row;
                                }
                            }
                            if (message == '') {
                                message = 'nothing';
                            }
                            load_Refinery_prodact_option_plan(rowno, select_date);
                        }
                    } else {
                        $("#timeLineGraph_actual").text("Nothing to display.");
                    }
                }
            });
        }
    });
}

function drawChart_actualbyblock() {

    var container = document.getElementById('timeLineGraph_actual');
    var chart = new google.visualization.Timeline(container);


    var select_date = $('#rpp_daily_date').val();
    var thisblock = $('#load_production_by_block').val();


    $.ajax({
        url: serverpath + '/Refinery/REFTH_PRODACTIVITY_LOAD_PERBLOCK_PLAN/',
        data: {
            select_date: select_date,
            thisblock: thisblock,

        },
        type: 'POST',
        cache: false,
        success: function (data) {
            if (data.length != 0) {
                $(".ref_text_label").removeAttr('style');
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn({ type: 'string', id: 'Role' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'string', role: 'style' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });

                $.each(data, function (index, value) {
                    if (value.REFTH_BlockId != null) {
                        var str_sdate = format_RP_Date(value.StartTime);
                        var sdate = str_sdate.split(',');
                        var str_edate = format_RP_Date(value.EndTime);
                        var edate = str_edate.split(',');

                        dataTable.addRow([' Block ' + value.REFTH_BlockId, value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);
                    }
                });

                var rowHeight = 200;
                var chartHeight = (dataTable.getNumberOfRows() + 1) + rowHeight;
                var options = {
                    timeline: {
                        groupByRowLabel: true,
                        rowLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12,
                            color: '#333333'
                        },
                        barLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12
                        }
                    },
                    avoidOverlappingGridLines: true,
                    height: chartHeight,
                    //width: '500px',
                };

                var view = new google.visualization.DataView(dataTable);
                view.setColumns([0, 1, 2, 3, 4, ]);
                chart.draw(dataTable, options);
                google.visualization.events.addListener(chart, 'select', click_edit);
                function click_edit() {
                    var selection = chart.getSelection();
                    var message = '';
                    var rowno = '';
                    for (var i = 0; i < selection.length; i++) {
                        var item = selection[i];
                        if (item.row != null && item.column != null) {
                            var str = dataTable.getFormattedValue(item.row, item.column);
                            message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.row != null) {
                            var str = dataTable.getFormattedValue(item.row, 0);
                            message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.column != null) {
                            var str = dataTable.getFormattedValue(0, item.column);
                            message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                            rowno += item.row;
                        }
                    }
                    if (message == '') {
                        message = 'nothing';
                    }
                    load_Refinery_prodact_option_plan(rowno, select_date);
                }
            } else {
                $("#timeLineGraph_actual").text("Nothing to display.");
            }
        }
    });
}

function drawChart_MachineDowntime() {

    var container = document.getElementById('timeLineGraph_MD');
    var chart = new google.visualization.Timeline(container);

    var select_date = $('#rpp_daily_date').val();

    $.ajax({
        url: serverpath + '/Refinery/drawChart_MachineDowntime/',
        data: {
            select_date: select_date,
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            if (data.length != 0) {
                $(".ref_text_label").removeAttr('style');
                var dataTable = new google.visualization.DataTable();
                // assumes "word" is a string and "count" is a number
                dataTable.addColumn({ type: 'string', id: 'Role' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'string', role: 'style' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });

                $.each(data, function (index, value) {

                    var str_sdate = format_RP_Date(value.REFTH_MDStartTime);
                    var sdate = str_sdate.split(',');
                    var str_edate = format_RP_Date(value.REFTH_MDEndTime);
                    var edate = str_edate.split(',');

                    dataTable.addRow([value.REFTH_MachineDesc, value.REFTH_MDReasonDesc, "#861286", new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);

                });

                var rowHeight = 200;
                var chartHeight = (dataTable.getNumberOfRows() + 1) + rowHeight;
                var options = {
                    timeline: {
                        groupByRowLabel: true,
                        rowLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12,
                            color: '#333333'
                        },
                        barLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12
                        }
                    },
                    avoidOverlappingGridLines: true,
                    height: chartHeight,
                    //width: '500px',
                };

                var view = new google.visualization.DataView(dataTable);
                view.setColumns([0, 1, 2, 3, 4, ]);

                chart.draw(dataTable, options);
                //google.visualization.events.addListener(chart, 'select', click_edit);
                //function click_edit() {
                //    var selection = chart.getSelection();
                //    var message = '';
                //    var rowno = '';
                //    for (var i = 0; i < selection.length; i++) {
                //        var item = selection[i];
                //        if (item.row != null && item.column != null) {
                //            var str = dataTable.getFormattedValue(item.row, item.column);
                //            message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                //            rowno += item.row;
                //        } else if (item.row != null) {
                //            var str = dataTable.getFormattedValue(item.row, 0);
                //            message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                //            rowno += item.row;
                //        } else if (item.column != null) {
                //            var str = dataTable.getFormattedValue(0, item.column);
                //            message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                //            rowno += item.row;
                //        }
                //    }
                //    if (message == '') {
                //        message = 'nothing';
                //    }
                //    //edit_prodact_direct_data_duration(rowno, select_date)
                //    load_Refinery_prodact_option(rowno, select_date);
                //}
            } else {
                $("#timeLineGraph_MD").text("Nothing to display.");
            }
        }
    });
}

function load_sample() {
    var container = document.getElementById('timeLineGraph_sample');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    var items = [{
        block: '1',
        code: 'ST',
        color: '#00b300',
        startdate: '2017, 0, 1, 8, 03',
        enddate: '2017, 0, 1, 8, 05',
        flag: 'Plan'
    }, {
        block: '1',
        code: 'KR',
        color: '#ffa500',
        startdate: '2017, 0, 1, 8, 03',
        enddate: '2017, 0, 1, 8, 05',
        flag: 'Actual'
    }
    , {
        block: '1',
        code: 'ST',
        color: '#00b300',
        startdate: '2017, 0, 1, 8, 03',
        enddate: '2017, 0, 1, 8, 15',
        flag: 'Plan'
    }, {
        block: '2',
        code: 'KR',
        color: '#ffa500',
        startdate: '2017, 0, 1, 8, 03',
        enddate: '2017, 0, 1, 8, 10',
        flag: 'Plan'
    },
     {
         block: '2',
         code: 'KR',
         color: '#ffa500',
         startdate: '2017, 0, 1, 8, 03',
         enddate: '2017, 0, 1, 8, 10',
         flag: 'Actual'
     }
    ];

    var block = 0;
    var flag;
    for (var i = 0; i < items.length; i++) {

        var str_date = items[i].startdate;
        var sdate = str_date.split(',');
        var end_date = items[i].enddate;
        var edate = end_date.split(',');

        //if (items[i].flag == "Plan") {          
        //    dataTable.addRows([
        //             ["Block " + items[i].block + " " + items[i].flag, items[i].code, items[i].color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4])
        //             ],
        //    ]);

        //   
        //}

        //if (items[i].flag =='Plan') {

        dataTable.addRows([
                 ["Block " + items[i].block + " " + items[i].flag, items[i].code, items[i].color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4])
                 ],
        ]);
        //} else {
        //    dataTable.addRows([
        //             ["Block " + items[i].block + " " + items[i].flag, items[i].code, items[i].color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4])
        //             ],
        //    ]);
        //}

        //flag = items[i].flag

    }
    //dataTable.addRows([
    //['Block #1', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #1', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #1', 'LT', '#0080ff', new Date(2017, 0, 1, 7), new Date(2017, 0, 1, 9)],

    //['Block #1', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #1', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #1', 'LT', '#0080ff', new Date(2017, 0, 1, 7), new Date(2017, 0, 1, 9)],

    //['Block #2', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #2', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #2', 'EF', '#cc0000', new Date(2017, 0, 1, 7, 12), new Date(2017, 0, 1, 8, 11)],

    //]);
    var rowHeight = 50;
    var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
    var options = {
        timeline: {
            groupByRowLabel: true,
            rowLabelStyle: {
                fontName: 'Roboto Condensed',
                fontSize: 14,
                color: '#333333'
            },
            barLabelStyle: {
                fontName: 'Roboto Condensed',
                fontSize: 14
            }
        },
        avoidOverlappingGridLines: true,
        height: chartHeight,
        width: '100%',
    };

    chart.draw(dataTable, options);
}

function drawChart_dataweek() {

    var container = document.getElementById('timeLineGraph_week');
    var chart = new google.visualization.Timeline(container);
    var thisdate = $("#rpp_input_date").val();

    //var iiMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
    //var iiYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
    //$("#rppw_iMonth").text(iiMonth);
    //$("#rppw_iYear").text(iiYear);
    var iMonth = parseInt($("#rpp_imonth").text()) + 1;
    var iYear = $("#rpp_iyear").text();

    $.ajax({
        url: serverpath + '/Refinery/get_productionplan_dataweek/',
        data: {
            iMonth: iMonth,
            iYear: iYear

        },
        type: 'POST',
        cache: false,
        success: function (data) {
            if (data.length != 0) {
                $(".ref_text_label").removeAttr('style');
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn({ type: 'string', id: 'Role' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'string', role: 'style' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });

                $.each(data, function (index, value) {
                    if (value.REFTH_BlockPairs != null) {
                        var str_sdate = format_RP_Date(value.StartDate);
                        var sdate = str_sdate.split(',');
                        var str_edate = format_RP_Date(value.EndDate);
                        var edate = str_edate.split(',');

                        dataTable.addRow(['Block ' + value.REFTH_BlockPairs, "OFFLINE", "#1abc9c", new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);
                    }
                });

                var rowHeight = 50;
                var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                var options = {
                    timeline: {
                        groupByRowLabel: true,
                        rowLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12,
                            color: '#333333'
                        },
                        barLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12
                        }
                    },
                    avoidOverlappingGridLines: false,
                    height: chartHeight,
                };

                var view = new google.visualization.DataView(dataTable);
                view.setColumns([0, 1, 2, 3, 4, ]);
                chart.draw(dataTable, options);
                google.visualization.events.addListener(chart, 'select', click_edit);
                function click_edit() {
                    var selection = chart.getSelection();
                    var message = '';
                    var rowno = '';
                    for (var i = 0; i < selection.length; i++) {
                        var item = selection[i];
                        if (item.row != null && item.column != null) {
                            var str = dataTable.getFormattedValue(item.row, item.column);
                            message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.row != null) {
                            var str = dataTable.getFormattedValue(item.row, 0);
                            message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.column != null) {
                            var str = dataTable.getFormattedValue(0, item.column);
                            message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                            rowno += item.row;
                        }
                    }
                    if (message == '') {
                        message = 'nothing';
                    }
                    //alert(rowno);
                }
            } else {
                $("#timeLineGraph_week").text("Nothing to display.");
            }
        }
    });
}

function format_RP_Date(theDate) {

    if (theDate == null) {
        return '-';

    } else {


        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var time = "AM";

        // find time 
        if (hour >= 12) {
            time = "PM";
        }
        // fix hours format
        if (hour > 12) {
            hour -= 12;
        }
        else if (hour == 0) {
            hour = 12;
        }
        // fix minutes format
        if (mins.length == 1) {
            mins = "00" + mins;
        }

        if (date.getMinutes() <= 9) {

            datemin = "0" + date.getMinutes();
        } else {
            datemin = date.getMinutes();
        }

        // return formatted date time string
        return parseInt(date.getFullYear()) + ',' + parseInt(date.getMonth() + 1) + ',' + parseInt(date.getDate()) + ',' + parseInt(date.getHours()) + ',' + parseInt(datemin);
    }
}

function upperCase_actcode(a) {
    a.value = a.value.toUpperCase();
}

function load_data_prod_act() {
    $('#ref_prod_act_table td').parent().remove();
    $.ajax({
        url: serverpath + '/Refinery/load_data_prod_act/',
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var note = value.REFTH_Remarks == null ? "-" : value.REFTH_Remarks;
                $('#ref_prod_act_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockId + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCode + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCodeDesc + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionStartDate) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionEndDate) + '</td>'
                    + '<td class="dfault_crop">' + note + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_prodact_data(' + value.REFTH_PPId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_prodact_data(' + value.REFTH_PPId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_prod_act_table', 30);
            });
        }
    });
}

function load_data_prod_act_bydate(id) {
    var date_val = $("#" + id).val();
    var monthyear = $("#rpp_input_date").val();
    var block_val = $("#load_production_by_block").val();
    $('#ref_prod_act_table td').parent().remove();
    $.ajax({
        url: serverpath + '/Refinery/load_data_prod_act_bydate/',
        data: {
            date_val: date_val,
            monthyear: monthyear,
            block_val: block_val
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var note = value.REFTH_Remarks == null ? "-" : value.REFTH_Remarks;
                $('#ref_prod_act_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockId + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCode + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCodeDesc + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionStartDate) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionEndDate) + '</td>'
                    + '<td class="dfault_crop">' + note + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_prodact_data(' + value.REFTH_PPId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_prodact_data(' + value.REFTH_PPId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_prod_act_table', 30);
            });
        }
    });
}

function load_data_prod_act_byblock(id) {
    var block_val = $("#" + id).val();
    var monthyear = $("#rpp_input_date").val();
    $('#ref_prod_act_table td').parent().remove();
    $.ajax({
        url: serverpath + '/Refinery/load_data_prod_act_byblock/',
        data: {
            block_val: block_val,
            monthyear: monthyear
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var note = value.REFTH_Remarks == null ? "-" : value.REFTH_Remarks;
                $('#ref_prod_act_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockId + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCode + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCodeDesc + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionStartDate) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionEndDate) + '</td>'
                    + '<td class="dfault_crop">' + note + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_prodact_data(' + value.REFTH_PPId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_prodact_data(' + value.REFTH_PPId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_prod_act_table', 30);
            });
        }
    });
}

function load_data_prod_act_bymonthyear(select) {
    $('#ref_prod_act_table td').parent().remove();
    $.ajax({
        url: serverpath + '/Refinery/load_data_prod_act_bymonthyear/',
        data: {
            monthyear: select
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var note = value.REFTH_Remarks == null ? "-" : value.REFTH_Remarks;
                $('#ref_prod_act_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockId + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCode + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCodeDesc + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionStartDate) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionEndDate) + '</td>'
                    + '<td class="dfault_crop">' + note + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_prodact_data(' + value.REFTH_PPId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_prodact_data(' + value.REFTH_PPId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_prod_act_table', 30);
            });
        }
    });
}

//add no restriction saved
function add_ref_prodact_restrict() {
    var ref_id = '';
    var key_idcnt = $("#Dialog_prod_add_activity_restrict #key_idcnt").text();
    var blockid = $('#Dialog_prod_add_activity_restrict #blockid').val();
    var REFTH_PP_Actcode_Id = $('#Dialog_prod_add_activity_restrict #REFTH_PP_Actcode_Id').text();
    var ref_prodact_note = $("#Dialog_prod_add_activity_restrict #ref_prodact_note").val();

    var s_date = new Date($('#Dialog_prod_add_activity_restrict #start_date_ref_add_act').val());
    var s_hr = $('#Dialog_prod_add_activity_restrict #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_prod_add_activity_restrict #start_time_min_ref_add_act').val();

    var end_date = new Date($('#Dialog_prod_add_activity_restrict #end_date_ref_add_act').val());
    var end_hr = $('#Dialog_prod_add_activity_restrict #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_prod_add_activity_restrict #end_time_min_ref_add_act').val();

    var rppd_totalduration = $("#Dialog_prod_add_activity_restrict #rppd_totalduration").text();
    var rppd_proddate = $("#rpp_daily_date").val();
    var REFTH_PPstreamId = $("#Dialog_prod_add_activity_restrict #streamid").val();
    var REFTH_Flag = $("#Dialog_prod_add_activity_restrict #production_type").val();

    add_start_date_ = s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });


    var start_date = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");
    var end_date = add_end_date_.toString("ddd, dd MMM yyyy H:mm:ss ");

    if (blockid == "" || blockid == 0 || REFTH_PP_Actcode_Id == "") {

        alert("Please select block or Activity code.");
    } else {

        $.ajax({
            url: serverpath + '/Refinery/add_ref_prodact_restrict/',
            data: {
                ref_id: ref_id,
                blockid: blockid,
                REFTH_PP_Actcode_Id: REFTH_PP_Actcode_Id,
                start_date: start_date,
                end_date: end_date,
                rppd_totalduration: rppd_totalduration,
                rppd_proddate: rppd_proddate,
                ref_prodact_note: ref_prodact_note,
                REFTH_PPstreamId: REFTH_PPstreamId,
                REFTH_Flag: REFTH_Flag
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#Dialog_prod_add_activity').dialog('close');
                if (key_idcnt > 0) {
                    drawChart_plan();
                    drawChart_actual();
                } else {
                    load_data_prod_act();
                }
                alert('Data now saved.');

            }
        });
    }
}

//edit no restriction saved
function edit_ref_prodact($this) {

    var dialogparent = "#" + $($this).closest('div.ui-dialog-content').attr('id');

    var ref_id = $(dialogparent + " #REFTH_PPId").text();
    var blockid = $(dialogparent + ' #blockid').val();
    var REFTH_PP_Actcode_Id = $(dialogparent + ' #REFTH_PP_Actcode_Id').text();
    var ref_prodact_note = $(dialogparent + " #ref_prodact_note").val();

    var s_date = new Date($(dialogparent + ' #start_date_ref_edit_act').val());
    var s_hr = $(dialogparent + ' #start_time_hr_ref_edit_act').val();
    var s_min = $(dialogparent + ' #start_time_min_ref_edit_act').val();

    var end_date = new Date($(dialogparent + ' #end_date_ref_edit_act').val());
    var end_hr = $(dialogparent + ' #end_time_hr_ref_edit_act').val();
    var end_min = $(dialogparent + ' #end_time_min_ref_edit_act').val();

    add_start_date_ = s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });


    var start_date = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");
    var end_date = add_end_date_.toString("ddd, dd MMM yyyy H:mm:ss ");

    if (blockid == "" || blockid == 0 || REFTH_PP_Actcode_Id == "") {

        alert("Please select block or Activity code.");
    } else {

        $.ajax({
            url: serverpath + '/Refinery/edit_ref_prodact/',
            data: {
                ref_id: ref_id,
                blockid: blockid,
                REFTH_PP_Actcode_Id: REFTH_PP_Actcode_Id,
                start_date: start_date,
                end_date: end_date,
                ref_prodact_note: ref_prodact_note
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                if (dialogparent == "#Dialog_prod_edit_activity") {
                    $('#Dialog_prod_edit_activity').dialog('close');
                    load_data_prod_act();
                } else {
                    $('#Dialog_proddirect_edit_activity').dialog('close');
                    if ($('#load_production_by_block').val() > 0) {
                        load_production_by_block();
                    } else {
                        drawChart_plan();
                        drawChart_actual();
                    }
                }
                alert('Data now saved.');
            }
        });
    }
}

//delete no restriction saved
function delete_prodact_data(ActId_) {
    themsg = 'Are you sure you want to delete this ?';
    var answer = confirm(themsg);
    if (answer) {
        $.ajax({
            url: serverpath + '/Refinery/delete_prodact_data/',
            data: {
                actid: ActId_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                load_data_prod_act();
            }
        });
    }
}

function searchin_ref_prodact(search_id, tblname) {
    $(search_id).keyup(function () {
        _this = this;
        // Show only matching TR, hide rest of them
        $.each($(tblname), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });
}

function format_RP_Dateonly(theDate) {

    if (theDate == null) {
        return '-';

    } else {


        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var time = "AM";

        // find time 
        if (hour >= 12) {
            time = "PM";
        }
        // fix hours format
        if (hour > 12) {
            hour -= 12;
        }
        else if (hour == 0) {
            hour = 12;
        }
        // fix minutes format
        if (mins.length == 1) {
            mins = "00" + mins;
        }

        if (date.getMinutes() <= 9) {

            datemin = "0" + date.getMinutes();
        } else {
            datemin = date.getMinutes();
        }

        if (date.getMonth() <= 9) {
            var datemon = date.getMonth() + 1;
            var datecnt = "0" + datemon;
        } else {
            datecnt = date.getMonth() + 1;
        }

        // return formatted date string
        return datecnt + '/' + parseInt(date.getDate()) + '/' + parseInt(date.getFullYear());
    }
}

function isDate(ExpiryDate) {
    var objDate,  // date object initialized from the ExpiryDate string 
        mSeconds, // ExpiryDate in milliseconds 
        day,      // day 
        month,    // month 
        year;     // year 
    // date length should be 10 characters (no more no less) 
    if (ExpiryDate.length !== 10) {
        return false;
    }
    // third and sixth character should be '/' 
    if (ExpiryDate.substring(2, 3) !== '/' || ExpiryDate.substring(5, 6) !== '/') {
        return false;
    }
    // extract month, day and year from the ExpiryDate (expected format is mm/dd/yyyy) 
    // subtraction will cast variables to integer implicitly (needed 
    // for !== comparing) 
    month = ExpiryDate.substring(0, 2) - 1; // because months in JS start from 0 
    day = ExpiryDate.substring(3, 5) - 0;
    year = ExpiryDate.substring(6, 10) - 0;
    // test year range 
    if (year < 1000 || year > 3000) {
        return false;
    }
    // convert ExpiryDate to milliseconds 
    mSeconds = (new Date(year, month, day)).getTime();
    // initialize Date() object from calculated milliseconds 
    objDate = new Date();
    objDate.setTime(mSeconds);
    // compare input date and parts from Date() object 
    // if difference exists then date isn't valid 
    if (objDate.getFullYear() !== year ||
        objDate.getMonth() !== month ||
        objDate.getDate() !== day) {
        return false;
    }
    // otherwise return true 
    return true;
}


function checkDate() {
    // define date string to test 
    $('#rppmothly_crop1_data_tbl').find('input[id*="ppm_1_excdate_"]').each(function () {
        var ExpiryDate = $(this).val();
        // check date and print message 
        if (isDate(ExpiryDate)) {
            //alert('Valid Date');   
            save_ref_rpp_monthlydata();
        }
        else {
            alert('There is a invalid date format in exchange date!');
            return false;
        }
    });
}

function save_ref_rpp_monthly() {
    //checkDate();
    save_ref_rpp_monthlydata();
    save_ref_rpp_monthlydataheader_input();
    save_ref_rpp_monthlydata_headertime();
}

function save_ref_rpp_monthlydata() {
    var items = [];
    var flag = 0;

    $('#rppmothly_crop1_data_tbl').find('tr[id*="rppmtr_"].change').each(function () {
        var attid = $(this).attr('id');
        var getp = attid.split('_');
        var short_count = $(this).val();
        var blkcnt = getp[1];
        var blkpair_id = getp[2];

        var REFTH_ExchangeDate = $("#ppm_1_excdate_1_" + blkcnt + "_crop_" + blkpair_id + "").val();
        var REFTH_CropNo = $("#ppm_2_cropno_1_" + blkcnt + "_crop_" + blkpair_id + "").val();
        var REFTH_NetKAH = $("#ppm_3_crop_1_" + blkcnt + "_" + blkpair_id + "").val();
        var REFTH_AnodeCharged_MT = $("#ppm_4_crop_1_" + blkcnt + "_" + blkpair_id + "").val();
        var REFTH_AnodeWtPc = $("#ppm_5_crop_1_" + blkcnt + "_" + blkpair_id + "").val();
        var REFTH_ElapsedKAH = $("#ppm_6_crop_1_" + blkcnt + "_" + blkpair_id + "").val();
        var REFTH_CurrentEff = $("#ppm_7_crop_1_" + blkcnt + "_" + blkpair_id + "").val();
        var REFTH_RequiredKAH = $("#ppm_8_crop_1_" + blkcnt + "_" + blkpair_id + "").val();
        var REFTH_KAHDatetmp = $("#ppm_9_datecrop_1_" + blkcnt + "_datetime_" + blkpair_id + "").val();
        var spl = REFTH_KAHDatetmp.split(" ");
        var s_date = new Date(spl[0]);
        var spl_time = spl[1].split(":");

        var s_hr = spl_time[0];
        var s_min = spl_time[1];

        add_start_date_ = s_date.add({
            minutes: s_min,
            hours: s_hr
        });
        var REFTH_KAHDate = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");
        var REFTH_ScrapRatio = $("#ppm_10_crop_1_" + blkcnt + "_" + blkpair_id + "").val();

        items.push({
            REFTH_ExchangeDate: REFTH_ExchangeDate,
            blkcnt: blkcnt,
            REFTH_CropNo: REFTH_CropNo,
            REFTH_NetKAH: REFTH_NetKAH,
            REFTH_AnodeCharged_MT: REFTH_AnodeCharged_MT,
            REFTH_AnodeWtPc: REFTH_AnodeWtPc,
            REFTH_ElapsedKAH: REFTH_ElapsedKAH,
            REFTH_CurrentEff: REFTH_CurrentEff,
            REFTH_RequiredKAH: REFTH_RequiredKAH,
            REFTH_KAHDate: REFTH_KAHDate,
            REFTH_ScrapRatio: REFTH_ScrapRatio
        });

    });



    items = JSON.stringify({ 'items': items });
    $('.ajax-loader').css("visibility", "visible");
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: serverpath + '/Refinery/save_ref_rpp_monthlydata/',
        data: items,
        success: function (data) {
            $('.ajax-loader').css("visibility", "hidden");
            alert('Changes now saved.');
            load_block_prod_plan_month();
        },
        complete: function () {
            $('.ajax-loader').css("visibility", "hidden");
        }
    });
}

function input_rppmonth_change(tbl) {
    $(tbl + " input").change(
              function () {
                  if ($(this).val() == '') {
                      $(this).css({ 'background-color': '#ffffcc' });
                      //$(this).removeClass('changed');
                      $(this).addClass('changed');
                      $(this).closest('tr').addClass('change')
                  } else {
                      $(this).css({ 'background-color': '#DFD8D1' });
                      $(this).addClass('changed');
                      $(this).closest('tr').addClass('change')
                  }

              });
}

function save_rppmonthKAHDate() {

    var rppmonthkey_id = $("#rppmonthkey_id").text();
    var rppmonthcropId = $("#rppmonthcropId").text();
    var rppmonthexcdatetmp = $("#rppmonthexcdate").text();
    var rppmontblkpair_id = $("#rppmontblkpair_id").text();
    var rppm1 = rppmonthexcdatetmp.split(" ");
    var rppmonthexcdate = rppm1[0];

    var dialogparent = "#" + $("#rppmonthkey_id").closest('div.ui-dialog-content').attr('id');

    var s_date = new Date($(dialogparent + ' #start_date_ref_add_act').val());
    var s_hr = $(dialogparent + ' #start_time_hr_ref_add_act').val();
    var s_min = $(dialogparent + ' #start_time_min_ref_add_act').val();

    add_start_date_ = s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    var start_date = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");

    $.ajax({
        url: serverpath + '/Refinery/save_rppmonthKAHDate/',
        data: {
            rppmonthkey_id: rppmonthkey_id,
            rppmonthcropId: rppmonthcropId,
            rppmonthexcdate: rppmonthexcdate,
            start_date: start_date
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $(dialogparent).dialog('close');
            //remove space in data
            var blk = rppmonthkey_id.replace(/\s/g, '');
            var REFTH_KAHDatetmp = $("#ppm_9_datecrop_1_" + rppmonthkey_id + "_datetime_" + rppmontblkpair_id + "").val(data);

        },

    });
}


function save_ref_rpp_monthlydataheader_input() {
    var items = [];
    var flag = 0;

    $('#rpp_refine_tablemonth').find('input[id*="rppm_"].changed').each(function () {
        var attid = $(this).attr('id');
        var getp = attid.split('_');

        var REFTHProdDate = $("#ref_rppm_date").val();
        var REFTHparamid = getp[2];
        var val_ = $(this).val();

        items.push({
            REFTHProdDate: REFTHProdDate,
            REFTHparamid: REFTHparamid,
            val_: val_,
        });
    });

    items = JSON.stringify({ 'items': items });
    $('.ajax-loader').css("visibility", "visible");
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: serverpath + '/Refinery/save_ref_rpp_monthlydataheader_input/',
        data: items,
        success: function (data) {
            $('.ajax-loader').css("visibility", "hidden");
            //alert('Changes now saved.');           
            load_rpp_refine_tablemonth();
            $("#rpp_refine_tablemonth input").removeClass('changed');
            $("#rpp_refine_tablemonth input").css({ 'background-color': '#ffffcc' });
        },
        complete: function () {
            $('.ajax-loader').css("visibility", "hidden");
        }
    });

}


function save_ref_rpp_monthlydata_headertime() {
    var items = [];
    var flag = 0;

    $('#rpp_refine_tablemonth').find('input[id*="rppmt_"].changed').each(function () {
        var attid = $(this).attr('id');
        var getp = attid.split('_');

        var REFTHProdDate = $("#ref_rppm_date").val();
        var REFTHparamid = getp[3];

        var s_date = new Date($(this).val());
        var s_hr = $(this).closest('tr').next().find('select').val();
        var s_min = $("#start_time_min_ref_edit_act_" + REFTHparamid).val();

        add_start_date_ = s_date.add({
            minutes: s_min,
            hours: s_hr
        });

        var REFTHdatetime = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");


        items.push({
            REFTHProdDate: REFTHProdDate,
            REFTHparamid: REFTHparamid,
            REFTHdatetime: REFTHdatetime,
        });
    });

    items = JSON.stringify({ 'items': items });
    $('.ajax-loader').css("visibility", "visible");
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: serverpath + '/Refinery/save_ref_rpp_monthlydata_headertime/',
        data: items,
        success: function (data) {
            $('.ajax-loader').css("visibility", "hidden");
            //alert('Changes now saved.');           
            load_rpp_refine_tablemonth();
            $("#rpp_refine_tablemonth select,input").removeClass('changed');
            $("#rpp_refine_tablemonth select,input").css({ 'background-color': '#ffffcc' });
        },
        complete: function () {
            $('.ajax-loader').css("visibility", "hidden");
        }
    });

}

function load_rpp_refine_tablemonth() {
    //var iiMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
    //var iiYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
    //$("#rpp_imonth").text(iiMonth);
    //$("#rpp_iyear").text(iiYear);
    var iMonth = parseInt($("#rpp_imonth").text()) + 1;
    var iYear = $("#rpp_iyear").text();


    $.ajax({
        url: serverpath + '/Refinery/load_rpp_refine_tablemonthtime/',
        data: {
            iMonth: iMonth,
            iYear: iYear
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var sdate = formatDate(value.REFTH_DateTimeVal);
                var eddate = formatDate(value.REFTH_DateTimeVal);
                if (sdate != "-") {
                    var param = sdate.split(" ");
                    var sdate = param[0];


                    var times = param[1];
                    var paramr = times.split(':');
                    var hrs = paramr[0];
                    var mins = paramr[1];

                    var outstart_date = $('#rppmt_monthly_date_' + value.REFTH_ParamId + '').val(sdate);

                    var fmins;
                    var fhrs;
                    if (mins == "00" || mins == "01" || mins == "02" || mins == "03" || mins == "04" || mins == "05" || mins == "06" || mins == "07" || mins == "08" || mins == "09") {
                        fmins = mins.charAt(1);
                        var oustart_min = $('#start_time_min_ref_edit_act_' + value.REFTH_ParamId + '').val(fmins);
                    } else {
                        var outstart_min = $('#start_time_min_ref_edit_act_' + value.REFTH_ParamId + '').val(mins);
                    }

                    if (hrs == "00" || hrs == "01" || hrs == "02" || hrs == "03" || hrs == "04" || hrs == "05" || hrs == "06" || hrs == "07" || hrs == "08" || hrs == "09") {
                        fhrs = hrs.charAt(1);
                        var outstart_hr = $('#start_time_hr_ref_edit_act_' + value.REFTH_ParamId + '').val(fhrs);
                    } else {
                        var outstart_hr = $('#start_time_hr_ref_edit_act_' + value.REFTH_ParamId + '').val(hrs);
                    }
                }
                //--------------------------------------------date--------------------

                if (eddate != "-") {
                    var params = eddate.split(" ");
                    var edate = params[0];


                    var time = params[1];
                    var paramss = time.split(':');
                    var hr = paramss[0];
                    var min = paramss[1];


                    var outend_date = $("#rppmt_curset_adjustment_" + value.REFTH_ParamId + "").val(edate);

                    var fmin;
                    var fhr;
                    if (min == "00" || min == "01" || min == "02" || min == "03" || min == "04" || min == "05" || min == "06" || min == "07" || min == "08" || min == "09") {
                        fmin = min.charAt(1);
                        var outend_min = $('#end_time_min_ref_edit_act_' + value.REFTH_ParamId + '').val(fmin);
                    } else {
                        var outend_min = $('#end_time_min_ref_edit_act_' + value.REFTH_ParamId + '').val(min);
                    }

                    if (hr == "00" || hr == "01" || hr == "02" || hr == "03" || hr == "04" || hr == "05" || hr == "06" || hr == "07" || hr == "08" || hr == "09") {
                        fhr = hr.charAt(1);
                        var outend_hr = $('#end_time_hr_ref_edit_act_' + value.REFTH_ParamId + '').val(fhr);
                    } else {
                        var outend_hr = $('#end_time_hr_ref_edit_act_' + value.REFTH_ParamId + '').val(hr);
                    }
                }
            });



            $.ajax({
                url: serverpath + '/Refinery/load_rpp_refine_tablemonthinput/',
                data: {
                    iMonth: iMonth,
                    iYear: iYear
                },
                type: 'POST',
                cache: false,
                success: function (data) {

                    $("input[id*='rppm_scrapratio_']").val("");
                    $("input[id*='rppm_elutionratio_']").val("");
                    $("input[id*='rppm_cursetka_']").val("");
                    $("input[id*='rppm_curreff_']").val("");
                    $("input[id*='rppm_effcursetka_']").val("");

                    $.each(data, function (index, value) {
                        $("#rppm_scrapratio_" + value.REFTH_ParamId + "").val(value.REFTH_NumVal);
                        $("#rppm_elutionratio_" + value.REFTH_ParamId + "").val(value.REFTH_NumVal);
                        $("#rppm_cursetka_" + value.REFTH_ParamId + "").val(value.REFTH_NumVal);
                        $("#rppm_curreff_" + value.REFTH_ParamId + "").val(value.REFTH_NumVal);
                        $("#rppm_effcursetka_" + value.REFTH_ParamId + "").val(value.REFTH_NumVal);
                    });
                }
            });
        }
    });
}

function drawChart_dataweekby_block(iMonth, iYear) {

    var container = document.getElementById('timeLineGraph_week');
    var chart = new google.visualization.Timeline(container);
    var thisblk = $("#drawChart_dataweekby_block").val();

    //var iiMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
    //var iiYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
    //$("#rppw_iMonth").text(iiMonth);
    //$("#rppw_iYear").text(iiYear);
    var iMonth = parseInt($("#rpp_imonth").text()) + 1;
    var iYear = $("#rpp_iyear").text();

    $.ajax({
        url: serverpath + '/Refinery/get_productionplanperblock_dataweek/',
        data: {
            iMonth: iMonth,
            iYear: iYear,
            thisblk: thisblk
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            if (data.length != 0) {
                $(".ref_text_label").removeAttr('style');
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn({ type: 'string', id: 'Role' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'string', role: 'style' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });

                $.each(data, function (index, value) {
                    if (value.REFTH_BlockPairs != null) {
                        var str_sdate = format_RP_Date(value.StartDate);
                        var sdate = str_sdate.split(',');
                        var str_edate = format_RP_Date(value.EndDate);
                        var edate = str_edate.split(',');

                        dataTable.addRow(['Block ' + value.REFTH_BlockPairs, "ONLINE", "#1abc9c", new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);
                    }
                });

                var rowHeight = 50;
                var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                var options = {
                    timeline: {
                        groupByRowLabel: true,
                        rowLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12,
                            color: '#333333'
                        },
                        barLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12
                        }
                    },
                    avoidOverlappingGridLines: false,
                    height: chartHeight,
                };

                var view = new google.visualization.DataView(dataTable);
                view.setColumns([0, 1, 2, 3, 4, ]);
                chart.draw(dataTable, options);
                google.visualization.events.addListener(chart, 'select', click_edit);
                function click_edit() {
                    var selection = chart.getSelection();
                    var message = '';
                    var rowno = '';
                    for (var i = 0; i < selection.length; i++) {
                        var item = selection[i];
                        if (item.row != null && item.column != null) {
                            var str = dataTable.getFormattedValue(item.row, item.column);
                            message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.row != null) {
                            var str = dataTable.getFormattedValue(item.row, 0);
                            message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.column != null) {
                            var str = dataTable.getFormattedValue(0, item.column);
                            message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                            rowno += item.row;
                        }
                    }
                    if (message == '') {
                        message = 'nothing';
                    }
                    //alert(rowno);
                }
            } else {
                $("#timeLineGraph_week").text("Nothing to display.");
            }
        }
    });
}

function load_rmmd_refresh() {
    //var cntr = $("#load_production_by_block").val();
    //if (cntr > 0) {
    load_production_by_block();
    //} else {
    load_refineryproducitonplan_graph();
    //}
}


$('.ref_code_desc_td').live('click', function () {

    var actcode_val = $(this).closest('td').prev('td').text();

    var dialogparent = $(this).closest('div.ui-dialog-content').attr('id');

    Refinery_ActivityCode(actcode_val, '#Dialog_prod_add_activity');
    Refinery_ActivityCode_edit(actcode_val, '#Dialog_proddirect_edit_activity');
    Refinery_ActivityCode_insert(actcode_val, '#Dialog_prod_insert_activity');

    $('#act_code_table td').css('background', '#FFFFFF');
    $('#act_code_table td').css('font-style', 'normal');

    $(this).css('background', '#FFFF99');
    $(this).css('font-style', 'italic');

    $(this).closest('td').prev('td').css('background', '#FFFF99');
    $(this).closest('td').prev('td').css('font-style', 'italic');

});

$('.ref_code_desc_td_plan').live('click', function () {

    var actcode_val = $(this).closest('td').prev('td').text();

    var dialogparent = $(this).closest('div.ui-dialog-content').attr('id');

    Refinery_ActivityCode_plan(actcode_val, '#Dialog_prod_add_activity_plan');
    Refinery_ActivityCode_edit_plan(actcode_val, '#Dialog_prod_edit_activity_plan');
    Refinery_ActivityCode_insert_plan(actcode_val, '#Dialog_prod_insert_activity_plan');

    $('#act_code_table td').css('background', '#FFFFFF');
    $('#act_code_table td').css('font-style', 'normal');

    $(this).css('background', '#FFFF99');
    $(this).css('font-style', 'italic');

    $(this).closest('td').prev('td').css('background', '#FFFF99');
    $(this).closest('td').prev('td').css('font-style', 'italic');

});

function delete_prodact_data_duration(key_id) {

    themsg = 'Are you sure you want to delete this ?';

    var thisblock = $('#load_production_by_block').val();
    var sdate = $('#rpp_daily_date').val();
    var streamid = $('#streamid').val();
    var answer = confirm(themsg);
    if (answer) {
        $.ajax({
            url: serverpath + '/Refinery/delete_prodact_data_duration/',
            data: {
                key_id: key_id,
                sdate: sdate,
                thisblock: thisblock,
                streamid: streamid
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $("#Dialog_prodact_option").dialog("close");
                if ($('#load_production_by_block').val() > 0) {
                    load_production_by_block();
                } else {
                    drawChart_plan();
                    //drawChart_actual();
                    drawChart_MachineDowntime();
                }
            }
        });
    }
}

function delete_prodact_data_duration_plan(key_id) {

    themsg = 'Are you sure you want to delete this ?';

    var thisblock = $('#load_production_by_block').val();
    var sdate = $('#rpp_daily_date').val();
    var answer = confirm(themsg);
    if (answer) {
        $.ajax({
            url: serverpath + '/Refinery/delete_prodact_data_duration_plan/',
            data: {
                key_id: key_id,
                sdate: sdate,
                thisblock: thisblock
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $("#Dialog_prodact_option_plan").dialog("close");
                if ($('#load_production_by_block').val() > 0) {
                    load_production_by_block();
                } else {
                    drawChart_plan();
                    //drawChart_actual();
                    drawChart_MachineDowntime();
                }
            }
        });
    }
}


/////////////////////--------------------------ADD RPPDAILY ------/////////////////////////////////////////////
function rppcheck_TotalDuration(dialogname, actcode_val) {

    var TotalDuration = $("#rppTotalDuration").text();
    var currduration = $("#Dialog_prod_add_activity #rppd_totalduration").text();
    var total = parseInt(TotalDuration) + parseInt(currduration);
    var i;
    if (total >= 1441) {
        alert("The 7 to 7 duty hours of this block is covered. Please select next production date or time or block to add activity.");
        $(dialogname + " #btn_prod").attr("disabled", true);
        //$(dialogname + " .ref_code_desc_td").attr("disabled", true);
        //$(dialogname + " #REFTH_PP_Actcode").attr("disabled", true);
        i = false;
    } else {
        i = true;
    }
    return i;
}

//when selecting block assign specific time add
function Refinery_ActivityCodeperblock(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    var production_type = $(dialogname + ' #production_type').val();
    var streamid = $(dialogname + ' #streamid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);
            load_rppd_datetime_block(dialogname, blockid, production_type, streamid);

        }
    });
}

function Refinery_ActivityCode(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);
            //load_rppd_datetime_block(dialogname, blockid);
            //get_default_time_per_ref_act_edit(dialogname, blockid, data.REFTH_PPcodeId);


            validation_ref_prodact_add();
            //validation_ref_prodact_edit("REFTH_PP_Actcode");
            //validation_ref_prodact_insert();

            //commented because of over used function
            //if (rppcheck_TotalDuration(dialogname, actcode_val)) { }
        }
    });

}

function load_rppd_datetime_block(dialogname, blockid, production_type, streamid) {

    var rpp_daily_date = $("#rpp_daily_date").val();

    $.ajax({
        url: serverpath + "/Refinery/load_rppd_datetime_block/",
        data: {
            blockid: blockid,
            rpp_daily_date: rpp_daily_date,
            production_type: production_type,
            streamid: streamid


        },
        success: function (data) {
            var tmpdatalength = 0;
            tmpdatalength = data.length;
            var TotalDuration = $("#rppTotalDuration").text(0);
            if (tmpdatalength > 0 || tmpdatalength == undefined) {
                var TotalDuration = $("#rppTotalDuration").text(data.TotalDuration);

                if (rppcheck_TotalDuration(dialogname, blockid)) {
                    var sdate = formatDate(data.StartDateTime);
                    var eddate = formatDate(data.EndDateTime);

                    if (eddate > sdate) {
                        sdate = eddate;
                    } else {
                        sdate = sdate;
                    }

                    var blockid = data.BlockId;

                    var param = sdate.split(" ");
                    var sdate = param[0];


                    var times = param[1];
                    var paramr = times.split(':');
                    var hrs = paramr[0];
                    var mins = paramr[1];


                    var outstart_date = $(dialogname + ' #start_date_ref_add_act').val(sdate);

                    var fmins;
                    var fhrs;
                    if (mins == "00" || mins == "01" || mins == "02" || mins == "03" || mins == "04" || mins == "05" || mins == "06" || mins == "07" || mins == "08" || mins == "09") {
                        fmins = mins.charAt(1);
                        var oustart_min = $(dialogname + ' #start_time_min_ref_add_act').val(fmins);
                    } else {
                        var outstart_min = $(dialogname + ' #start_time_min_ref_add_act').val(mins);
                    }

                    if (hrs == "00" || hrs == "01" || hrs == "02" || hrs == "03" || hrs == "04" || hrs == "05" || hrs == "06" || hrs == "07" || hrs == "08" || hrs == "09") {
                        fhrs = hrs.charAt(1);
                        var outstart_hr = $(dialogname + ' #start_time_hr_ref_add_act').val(fhrs);
                    } else {
                        var outstart_hr = $(dialogname + ' #start_time_hr_ref_add_act').val(hrs);
                    }

                    //------------------------End date Value Assign-------

                    var params = eddate.split(" ");
                    var edate = params[0];


                    var time = params[1];
                    var paramss = time.split(':');
                    var hr = paramss[0];
                    var min = paramss[1];


                    var outend_date = $(dialogname + ' #end_date_ref_add_act').val(edate);

                    var fmin;
                    var fhr;
                    if (min == "00" || min == "01" || min == "02" || min == "03" || min == "04" || min == "05" || min == "06" || min == "07" || min == "08" || min == "09") {
                        fmin = min.charAt(1);
                        var outend_min = $(dialogname + ' #end_time_min_ref_add_act').val(fmin);
                    } else {
                        var outend_min = $(dialogname + ' #end_time_min_ref_add_act').val(min);
                    }

                    if (hr == "00" || hr == "01" || hr == "02" || hr == "03" || hr == "04" || hr == "05" || hr == "06" || hr == "07" || hr == "08" || hr == "09") {
                        fhr = hr.charAt(1);
                        var outend_hr = $(dialogname + ' #end_time_hr_ref_add_act').val(fhr);
                    } else {
                        var outend_hr = $(dialogname + ' #end_time_hr_ref_add_act').val(hr);
                    }
                    validation_ref_prodact_add();
                    var actcode_val = $(dialogname + " #REFTH_PP_Actcode").val();

                    //Refinery_ActivityCode(actcode_val, dialogname);
                    //validation_ref_prodact_edit("REFTH_PP_Actcode");
                }
            }
        }
    });
}

function add_ref_prodact_by_duration() {
    var ref_id = '';
    var key_idcnt = $("#Dialog_prod_add_activity #REFTH_PPId").text();
    var blockid = $('#Dialog_prod_add_activity #blockid').val();
    var REFTH_PP_Actcode_Id = $('#Dialog_prod_add_activity #REFTH_PP_Actcode_Id').text();
    var rppd_totalduration = $("#Dialog_prod_add_activity #rppd_totalduration").text();
    var rppd_proddate = $("#rpp_daily_date").val();
    var ref_prodact_note = $("#Dialog_prod_add_activity #ref_prodact_note").val();
    var REFTH_PPstreamId = $("#Dialog_prod_add_activity #streamid").val(); //== "" ? 0 : $("#Dialog_prod_add_activity #streamid").val();
    var REFTH_Flag = $("#Dialog_prod_add_activity #production_type").val();

    if (blockid == "" || blockid == 0 || REFTH_PP_Actcode_Id == "") {
        alert("Please select block or Activity code.");
    } else if (REFTH_Flag == "" || REFTH_Flag == 0 || REFTH_PPstreamId == "" || REFTH_PPstreamId == 0) {
        alert("Please select production type or Stream.");
    } else {

        $.ajax({
            url: serverpath + '/Refinery/add_ref_prodact_by_duration/',
            data: {
                ref_id: ref_id,
                blockid: blockid,
                REFTH_PP_Actcode_Id: REFTH_PP_Actcode_Id,
                rppd_totalduration: rppd_totalduration,
                rppd_proddate: rppd_proddate,
                ref_prodact_note: ref_prodact_note,
                REFTH_PPstreamId: REFTH_PPstreamId,
                REFTH_Flag: REFTH_Flag

            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#Dialog_prod_add_activity').dialog('close');
                if ($('#load_production_by_block').val() > 0) {
                    load_production_by_block();
                } else {
                    drawChart_plan();
                    //drawChart_actual();
                }
                alert('Data now saved.');

            }
        });
    }
}

function validation_ref_prodact_add() {

    $("#Dialog_prod_add_activity .ref_code_desc_td").attr("disabled", false);
    $("#Dialog_prod_add_activity #REFTH_PP_Actcode").attr("disabled", false);

    var add_s_date = new Date($('#Dialog_prod_add_activity #start_date_ref_add_act').val());
    var s_hr = $('#Dialog_prod_add_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_prod_add_activity #start_time_min_ref_add_act').val();


    var add_e_date = new Date($('#Dialog_prod_add_activity #end_date_ref_add_act').val());
    var end_hr = $('#Dialog_prod_add_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_prod_add_activity #end_time_min_ref_add_act').val();
    var con_desc = $('#Dialog_prod_add_activity #REFTH_ActCodeDesc').text();

    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((add_end_date - add_start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);

    var the_duration = Math.floor((add_end_date - add_start_date) / 60000);

    if (con_desc == "Invalid Code.") {
        $("#Dialog_prod_add_activity #btn_prod").attr("disabled", true);
    } else if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $("#Dialog_prod_add_activity #error_msg_time_ref").html("ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.");
        $("#Dialog_prod_add_activity #ref_duration").text("ERROR");
        $("#Dialog_prod_add_activity #btn_prod").attr("disabled", true);
    } else {
        $("#Dialog_prod_add_activity #error_msg_time_ref").html("Correct: <b>Time</b> is Good.");
        $("#Dialog_prod_add_activity #ref_duration").text(the_dur);
        $("#Dialog_prod_add_activity #rppd_totalduration").text(the_duration);
        $("#Dialog_prod_add_activity #btn_prod").attr("disabled", false);

    }
    if (rppcheck_TotalDuration("#Dialog_prod_add_activity", con_desc)) { }
}

function get_default_time_per_ref_act(dialogname, blockid, REFTH_PPcodeId) {
    var min_cnt = 0;
    if (blockid >= 1 && blockid <= 36) {
        switch (REFTH_PPcodeId) {
            case 1:
                min_cnt = 15;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 2:
                min_cnt = 300;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 3:
                min_cnt = 75;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 4:
                min_cnt = 1;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 5:
                min_cnt = 195;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 6:
                min_cnt = 1;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 7:
                min_cnt = 1;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 8:
                min_cnt = 1;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 9:
                min_cnt = 15;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
        }
    } else if (blockid >= 37 && blockid <= 48) {
        switch (REFTH_PPcodeId) {
            case 1:
                min_cnt = 15;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 2:
                min_cnt = 360;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 3:
                min_cnt = 75;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 4:
                min_cnt = 1;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 5:
                min_cnt = 195;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 6:
                min_cnt = 1;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 7:
                min_cnt = 1;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 8:
                min_cnt = 1;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 9:
                min_cnt = 15;
                get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
        }
    }
}

function get_act_default_time(dialogname, blockid, REFTH_PPcodeId, min_cnt) {


    var end_date = new Date($(dialogname + ' #start_date_ref_add_act').val());
    var end_hr = $(dialogname + ' #start_time_hr_ref_add_act').val();
    var end_min = parseInt($(dialogname + ' #start_time_min_ref_add_act').val()) + min_cnt;

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var end_mody = add_end_date_.toString("yyyy-MM-dd HH:mm:ss");

    var params = end_mody.split(" ");
    var ld = params[0];
    var sp = ld.split("-");
    var edate = sp[1] + '/' + sp[2] + '/' + sp[0];

    var time = params[1];
    var paramss = time.split(':');
    var hr = paramss[0];
    var min = paramss[1];


    var outend_date = $(dialogname + ' #end_date_ref_add_act').val(edate);
    var outend_hr = $(dialogname + ' #end_time_hr_ref_add_act').val(hr);
    var fmin;
    var fhr;
    if (min == 00 || min == 01 || min == 02 || min == 03 || min == 04 || min == 05 || min == 06 || min == 07 || min == 08 || min == 09) {
        fmin = min.charAt(1);
        var outend_min = $(dialogname + ' #end_time_min_ref_add_act').val(fmin);
    } else {
        var outend_min = $(dialogname + ' #end_time_min_ref_add_act').val(min);
    }

    if (hr == 00 || hr == 01 || hr == 02 || hr == 03 || hr == 04 || hr == 05 || hr == 06 || hr == 07 || hr == 08 || hr == 09) {
        fhr = hr.charAt(1);
        var outend_hr = $(dialogname + ' #end_time_hr_ref_add_act').val(fhr);
    } else {
        var outend_hr = $(dialogname + ' #end_time_hr_ref_add_act').val(hr);
    }

}

/////////////////////--------------------------ADD RPPDAILY ------/////////////////////////////////////////////
/////////////////////--------------------------EDIT RPPDAILY ------/////////////////////////////////////////////

//Validate if Duration of Edit already reached 24 hours
function rppcheck_TotalDuration_prod_edit(dialogname, actcode_val) {

    var TotalDuration = $("#rppTotalDuration").text();
    var currduration = $("#Dialog_proddirect_edit_activity #rppd_totalduration").text();
    var vardur = $("#Dialog_proddirect_edit_activity #rppd_totalduration_var").text();
    var total = parseInt(TotalDuration) - parseInt(vardur);
    var second_total = parseInt(total) + parseInt(currduration);
    var i;
    if (second_total >= 1441) {
        alert("The 7 to 7 duty hours of this block is covered. Please select next production date or time to add activity.");
        $("#Dialog_proddirect_edit_activity #btn_prod").attr("disabled", true);
        //$(dialogname + " .ref_code_desc_td").attr("disabled", true);
        //$(dialogname + " #REFTH_PP_Actcode").attr("disabled", true);
        i = false;
    } else {
        i = true;
    }
    return i;
}

//when selecting block assign specific time edit
function Refinery_ActivityCodeperblock_edit(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    var production_type = $(dialogname + ' #production_type').val();
    var streamid = $(dialogname + ' #streamid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);          
            load_rppd_datetime_block_prod_edit(dialogname, blockid, production_type, streamid);

        }
    });
}

function Refinery_ActivityCode_edit(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);
            //load_rppd_datetime_block(dialogname, blockid);
            get_default_time_per_ref_act_edit(dialogname, blockid, data.REFTH_PPcodeId);


            //validation_ref_prodact_add();
            validation_ref_prodact_edit("REFTH_PP_Actcode");

            //commented because of over used function
            //if (rppcheck_TotalDuration_prod_edit(dialogname, actcode_val)) { }
        }
    });

}

//load data with no function(load_rppd_datetime_block) that will set deafault time 
function Refinery_ActivityCodeload_prodactedit(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //load_rppd_datetime_block(dialogname, blockid);
            //get_default_time_per_ref_act_edit(dialogname, blockid, data.REFTH_PPcodeId);


            //validation_ref_prodact_add();
            validation_ref_prodact_edit("REFTH_PP_Actcode");
            //if (rppcheck_TotalDuration_prod_edit(dialogname, actcode_val)) { }
        }
    });

}

//load total duration and time for edit
function load_rppd_datetime_block_prod_edit(dialogname, blockid, production_type, streamid) {

    var rpp_daily_date = $("#rpp_daily_date").val();

    $.ajax({
        url: serverpath + "/Refinery/load_rppd_datetime_block/",
        data: {
            blockid: blockid,
            rpp_daily_date: rpp_daily_date,
            production_type: production_type,
            streamid: streamid

        },
        success: function (data) {
            var tmpdatalength = 0;
            tmpdatalength = data.length;
            var TotalDuration = $("#rppTotalDuration").text(0);
            if (tmpdatalength > 0 || tmpdatalength == undefined) {
                var TotalDuration = $("#rppTotalDuration").text(data.TotalDuration);

                if (rppcheck_TotalDuration_prod_edit(dialogname, blockid)) {
                    var sdate = formatDate(data.StartDateTime);
                    var eddate = formatDate(data.EndDateTime);

                    if (eddate > sdate) {
                        sdate = eddate;
                    } else {
                        sdate = sdate;
                    }

                    var blockid = data.BlockId;

                    var param = sdate.split(" ");
                    var sdate = param[0];


                    var times = param[1];
                    var paramr = times.split(':');
                    var hrs = paramr[0];
                    var mins = paramr[1];


                    //var outstart_date = $(dialogname + ' #start_date_ref_edit_act').val(sdate);

                    //var fmins;
                    //var fhrs;
                    //if (mins == "00" || mins == "01" || mins == "02" || mins == "03" || mins == "04" || mins == "05" || mins == "06" || mins == "07" || mins == "08" || mins == "09") {
                    //    fmins = mins.charAt(1);
                    //    var oustart_min = $(dialogname + ' #start_time_min_ref_edit_act').val(fmins);
                    //} else {
                    //    var outstart_min = $(dialogname + ' #start_time_min_ref_edit_act').val(mins);
                    //}

                    //if (hrs == "00" || hrs == "01" || hrs == "02" || hrs == "03" || hrs == "04" || hrs == "05" || hrs == "06" || hrs == "07" || hrs == "08" || hrs == "09") {
                    //    fhrs = hrs.charAt(1);
                    //    var outstart_hr = $(dialogname + ' #start_time_hr_ref_edit_act').val(fhrs);
                    //} else {
                    //    var outstart_hr = $(dialogname + ' #start_time_hr_ref_edit_act').val(hrs);
                    //}

                    ////------------------------End date Value Assign-------

                    //var params = eddate.split(" ");
                    //var edate = params[0];


                    //var time = params[1];
                    //var paramss = time.split(':');
                    //var hr = paramss[0];
                    //var min = paramss[1];


                    //var outend_date = $(dialogname + ' #end_date_ref_edit_act').val(edate);

                    //var fmin;
                    //var fhr;
                    //if (min == "00" || min == "01" || min == "02" || min == "03" || min == "04" || min == "05" || min == "06" || min == "07" || min == "08" || min == "09") {
                    //    fmin = min.charAt(1);
                    //    var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(fmin);
                    //} else {
                    //    var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(min);
                    //}

                    //if (hr == "00" || hr == "01" || hr == "02" || hr == "03" || hr == "04" || hr == "05" || hr == "06" || hr == "07" || hr == "08" || hr == "09") {
                    //    fhr = hr.charAt(1);
                    //    var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(fhr);
                    //} else {
                    //    var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(hr);
                    //}
                    validation_ref_prodact_edit();
                    var actcode_val = $(dialogname + " #REFTH_PP_Actcode").val();
                    //Refinery_ActivityCode_edit(actcode_val, dialogname);
                    //validation_ref_prodact_edit("REFTH_PP_Actcode");
                }
            }
        }
    });
}

function edit_ref_prodact_by_duration() {
    var ref_id = $("#Dialog_proddirect_edit_activity #REFTH_PPId").text();
    var key_idcnt = $("#Dialog_proddirect_edit_activity #key_idcnt").text();
    var blockid = $('#Dialog_proddirect_edit_activity #blockid').val();
    var REFTH_PP_Actcode_Id = $('#Dialog_proddirect_edit_activity #REFTH_PP_Actcode_Id').text();
    var REFTH_ActDuration = $("#Dialog_proddirect_edit_activity #rppd_totalduration").text();
    var rppd_proddate = $("#rpp_daily_date").val();
    var ref_prodact_note = $("#Dialog_proddirect_edit_activity #ref_prodact_note").val();

    if (blockid == "" || blockid == 0 || REFTH_PP_Actcode_Id == "") {

        alert("Please select block or Activity code.");
    } else {

        $.ajax({
            url: serverpath + '/Refinery/edit_ref_prodact/',
            data: {
                ref_id: ref_id,
                blockid: blockid,
                REFTH_PP_Actcode_Id: REFTH_PP_Actcode_Id,
                REFTH_ActDuration: REFTH_ActDuration,
                ref_prodact_note: ref_prodact_note
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#Dialog_proddirect_edit_activity').dialog('close');
                $("#Dialog_prodact_option").dialog("close");
                if ($('#load_production_by_block').val() > 0) {
                    load_production_by_block();
                } else {
                    drawChart_plan();
                    //drawChart_actual();
                }
                alert('Data now saved.');

            }
        });
    }
}

function validation_ref_prodact_edit($this) {

    var this_dialog = "#" + $("#" + $this).closest('div.ui-dialog-content').attr('id');

    var add_s_date = new Date($('#Dialog_proddirect_edit_activity #start_date_ref_edit_act').val());
    var s_hr = $('#Dialog_proddirect_edit_activity #start_time_hr_ref_edit_act').val();
    var s_min = $('#Dialog_proddirect_edit_activity #start_time_min_ref_edit_act').val();


    var add_e_date = new Date($('#Dialog_proddirect_edit_activity #end_date_ref_edit_act').val());
    var end_hr = $('#Dialog_proddirect_edit_activity #end_time_hr_ref_edit_act').val();
    var end_min = $('#Dialog_proddirect_edit_activity #end_time_min_ref_edit_act').val();
    var con_desc = $('#Dialog_proddirect_edit_activity #REFTH_ActCodeDesc').text();


    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((add_end_date - add_start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);

    var the_duration = Math.floor((add_end_date - add_start_date) / 60000);

    if (con_desc == "Invalid Code.") {
        $('#Dialog_proddirect_edit_activity #btn_prod').attr('disabled', true);
    } else if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $('#Dialog_proddirect_edit_activity #error_msg_time_ref').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $("#Dialog_proddirect_edit_activity #ref_duration").text("ERROR");
        $('#Dialog_proddirect_edit_activity #btn_prod').attr('disabled', true);
    } else {
        $('#Dialog_proddirect_edit_activity #error_msg_time_ref').html('Correct: <b>Time</b> is Good.');
        $("#Dialog_proddirect_edit_activity #ref_duration").text(the_dur);
        $("#Dialog_proddirect_edit_activity #rppd_totalduration").text(the_duration);
        $('#Dialog_proddirect_edit_activity #btn_prod').attr('disabled', false);
    }
    if (rppcheck_TotalDuration_prod_edit("#Dialog_proddirect_edit_activity", con_desc)) { }
}

//get the default time when user selected activity code in edit by block
function get_default_time_per_ref_act_edit(dialogname, blockid, REFTH_PPcodeId) {
    var min_cnt = 0;
    if (blockid >= 1 && blockid <= 36) {
        switch (REFTH_PPcodeId) {
            case 1:
                min_cnt = 15;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 2:
                min_cnt = 300;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 3:
                min_cnt = 75;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 4:
                min_cnt = 1;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 5:
                min_cnt = 195;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 6:
                min_cnt = 1;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 7:
                min_cnt = 1;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 8:
                min_cnt = 1;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 9:
                min_cnt = 15;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
        }
    } else if (blockid >= 37 && blockid <= 48) {
        switch (REFTH_PPcodeId) {
            case 1:
                min_cnt = 15;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 2:
                min_cnt = 360;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 3:
                min_cnt = 75;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 4:
                min_cnt = 1;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 5:
                min_cnt = 195;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 6:
                min_cnt = 1;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 7:
                min_cnt = 1;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 8:
                min_cnt = 1;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 9:
                min_cnt = 15;
                get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
        }
    }
}

//get the default time when user selected activity code in edit
function get_act_default_time_edit(dialogname, blockid, REFTH_PPcodeId, min_cnt) {


    var end_date = new Date($(dialogname + ' #start_date_ref_edit_act').val());
    var end_hr = $(dialogname + ' #start_time_hr_ref_edit_act').val();
    var end_min = parseInt($(dialogname + ' #start_time_min_ref_edit_act').val()) + min_cnt;

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var end_mody = add_end_date_.toString("yyyy-MM-dd HH:mm:ss");

    var params = end_mody.split(" ");
    var ld = params[0];
    var sp = ld.split("-");
    var edate = sp[1] + '/' + sp[2] + '/' + sp[0];

    var time = params[1];
    var paramss = time.split(':');
    var hr = paramss[0];
    var min = paramss[1];


    var outend_date = $(dialogname + ' #end_date_ref_edit_act').val(edate);
    var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(hr);
    var fmin;
    var fhr;
    if (min == 00 || min == 01 || min == 02 || min == 03 || min == 04 || min == 05 || min == 06 || min == 07 || min == 08 || min == 09) {
        fmin = min.charAt(1);
        var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(fmin);
    } else {
        var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(min);
    }

    if (hr == 00 || hr == 01 || hr == 02 || hr == 03 || hr == 04 || hr == 05 || hr == 06 || hr == 07 || hr == 08 || hr == 09) {
        fhr = hr.charAt(1);
        var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(fhr);
    } else {
        var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(hr);
    }

}

/////////////////////--------------------------EDIT RPPDAILY ------/////////////////////////////////////////////
/////////////////////--------------------------INSERT RPPDAILY ------/////////////////////////////////////////////

function rppcheck_TotalDuration_prod_insert(dialogname, actcode_val) {

    var TotalDuration = $("#rppTotalDuration").text();
    var currduration = $("#Dialog_prod_insert_activity #rppd_totalduration").text();
    //var vardur = $("#Dialog_prod_insert_activity #rppd_totalduration_var").text();
    //var total = parseInt(TotalDuration) - parseInt(vardur);
    //var second_total = parseInt(total) + parseInt(currduration);
    var second_total = parseInt(TotalDuration) + parseInt(currduration);
    var i;
    if (second_total >= 1441) {
        alert("The 7 to 7 duty hours of this block is covered. Please select next production date or time to add activity.");
        $("#Dialog_prod_insert_activity #btn_prod").attr("disabled", true);
        //$(dialogname + " .ref_code_desc_td").attr("disabled", true);
        //$(dialogname + " #REFTH_PP_Actcode").attr("disabled", true);
        i = false;
    } else {
        i = true;
    }
    return i;
}

//when selecting block assign specific time insert
function Refinery_ActivityCodeperblock_insert(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    var production_type = $(dialogname + ' #production_type').val();
    var streamid = $(dialogname + ' #streamid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);          
            load_rppd_datetime_block_prod_insert(dialogname, blockid, production_type, streamid);

        }
    });
}

function Refinery_ActivityCode_insert(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);
            //load_rppd_datetime_block(dialogname, blockid);
            get_default_time_per_ref_act_edit(dialogname, blockid, data.REFTH_PPcodeId);


            validation_ref_prodact_insert();
            //validation_ref_prodact_edit("REFTH_PP_Actcode");

            //commented because of over used function
            //if (rppcheck_TotalDuration_prod_insert(dialogname, actcode_val)) { }
        }
    });

}

//load data with no function(load_rppd_datetime_block) that will set deafault time 
function Refinery_ActivityCodeload_prodact_insert(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //load_rppd_datetime_block(dialogname, blockid);
            //get_default_time_per_ref_act_edit(dialogname, blockid, data.REFTH_PPcodeId);


            //validation_ref_prodact_add();
            validation_ref_prodact_insert("REFTH_PP_Actcode");
            //if (rppcheck_TotalDuration_prod_edit(dialogname, actcode_val)) { }
        }
    });

}

//load total duration and time for edit
function load_rppd_datetime_block_prod_insert(dialogname, blockid, production_type, streamid) {

    var rpp_daily_date = $("#rpp_daily_date").val();

    $.ajax({
        url: serverpath + "/Refinery/load_rppd_datetime_block/",
        data: {
            blockid: blockid,
            rpp_daily_date: rpp_daily_date,
            production_type: production_type,
            streamid: streamid

        },
        success: function (data) {
            var tmpdatalength = 0;
            tmpdatalength = data.length;
            var TotalDuration = $("#rppTotalDuration").text(0);
            if (tmpdatalength > 0 || tmpdatalength == undefined) {
                var TotalDuration = $("#rppTotalDuration").text(data.TotalDuration);

                if (rppcheck_TotalDuration_prod_insert(dialogname, blockid)) {
                    var sdate = formatDate(data.StartDateTime);
                    var eddate = formatDate(data.EndDateTime);

                    if (eddate > sdate) {
                        sdate = eddate;
                    } else {
                        sdate = sdate;
                    }

                    var blockid = data.BlockId;

                    var param = sdate.split(" ");
                    var sdate = param[0];


                    var times = param[1];
                    var paramr = times.split(':');
                    var hrs = paramr[0];
                    var mins = paramr[1];


                    //var outstart_date = $(dialogname + ' #start_date_ref_edit_act').val(sdate);

                    //var fmins;
                    //var fhrs;
                    //if (mins == "00" || mins == "01" || mins == "02" || mins == "03" || mins == "04" || mins == "05" || mins == "06" || mins == "07" || mins == "08" || mins == "09") {
                    //    fmins = mins.charAt(1);
                    //    var oustart_min = $(dialogname + ' #start_time_min_ref_edit_act').val(fmins);
                    //} else {
                    //    var outstart_min = $(dialogname + ' #start_time_min_ref_edit_act').val(mins);
                    //}

                    //if (hrs == "00" || hrs == "01" || hrs == "02" || hrs == "03" || hrs == "04" || hrs == "05" || hrs == "06" || hrs == "07" || hrs == "08" || hrs == "09") {
                    //    fhrs = hrs.charAt(1);
                    //    var outstart_hr = $(dialogname + ' #start_time_hr_ref_edit_act').val(fhrs);
                    //} else {
                    //    var outstart_hr = $(dialogname + ' #start_time_hr_ref_edit_act').val(hrs);
                    //}

                    ////------------------------End date Value Assign-------

                    //var params = eddate.split(" ");
                    //var edate = params[0];


                    //var time = params[1];
                    //var paramss = time.split(':');
                    //var hr = paramss[0];
                    //var min = paramss[1];


                    //var outend_date = $(dialogname + ' #end_date_ref_edit_act').val(edate);

                    //var fmin;
                    //var fhr;
                    //if (min == "00" || min == "01" || min == "02" || min == "03" || min == "04" || min == "05" || min == "06" || min == "07" || min == "08" || min == "09") {
                    //    fmin = min.charAt(1);
                    //    var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(fmin);
                    //} else {
                    //    var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(min);
                    //}

                    //if (hr == "00" || hr == "01" || hr == "02" || hr == "03" || hr == "04" || hr == "05" || hr == "06" || hr == "07" || hr == "08" || hr == "09") {
                    //    fhr = hr.charAt(1);
                    //    var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(fhr);
                    //} else {
                    //    var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(hr);
                    //}
                    validation_ref_prodact_insert();
                    var actcode_val = $(dialogname + " #REFTH_PP_Actcode").val();
                    //Refinery_ActivityCode_edit(actcode_val, dialogname);
                    //validation_ref_prodact_edit("REFTH_PP_Actcode");
                }
            }
        }
    });
}

function insert_ref_prodact_by_duration() {

    var ref_id = $("#Dialog_prod_insert_activity #REFTH_PPId").text();
    var key_idcnt = $("#Dialog_prod_insert_activity #key_idcnt").text();
    var blockid = $('#Dialog_prod_insert_activity #blockid').val();
    var REFTH_PP_Actcode_Id = $('#Dialog_prod_insert_activity #REFTH_PP_Actcode_Id').text();
    var REFTH_ActDuration = $("#Dialog_prod_insert_activity #rppd_totalduration").text();
    var rppd_proddate = $("#rpp_daily_date").val();
    var ref_prodact_note = $("#Dialog_prod_insert_activity #ref_prodact_note").val();
    var REFTH_PPstreamId = $("#Dialog_prod_insert_activity #streamid").val(); //== "" ? 0 : $("#Dialog_prod_add_activity #streamid").val();
    var REFTH_Flag = $("#Dialog_prod_insert_activity #production_type").val();


    if (blockid == "" || blockid == 0 || REFTH_PP_Actcode_Id == "") {

        alert("Please select block or Activity code.");
    } else {

        $.ajax({
            url: serverpath + '/Refinery/insert_ref_prodact_by_duration/',
            data: {
                ref_id: ref_id,
                blockid: blockid,
                REFTH_PP_Actcode_Id: REFTH_PP_Actcode_Id,
                rppd_totalduration: REFTH_ActDuration,
                rppd_proddate: rppd_proddate,
                ref_prodact_note: ref_prodact_note,
                REFTH_PPstreamId: REFTH_PPstreamId,
                REFTH_Flag: REFTH_Flag

            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#Dialog_prod_insert_activity').dialog('close');
                $("#Dialog_prodact_option").dialog("close");
                if ($('#load_production_by_block').val() > 0) {
                    load_production_by_block();
                } else {
                    drawChart_plan();
                    //drawChart_actual();
                }
                alert('Data now saved.');

            }
        });
    }
}

function validation_ref_prodact_insert($this) {

    var this_dialog = "#" + $("#" + $this).closest('div.ui-dialog-content').attr('id');

    var add_s_date = new Date($('#Dialog_prod_insert_activity #start_date_ref_edit_act').val());
    var s_hr = $('#Dialog_prod_insert_activity #start_time_hr_ref_edit_act').val();
    var s_min = $('#Dialog_prod_insert_activity #start_time_min_ref_edit_act').val();


    var add_e_date = new Date($('#Dialog_prod_insert_activity #end_date_ref_edit_act').val());
    var end_hr = $('#Dialog_prod_insert_activity #end_time_hr_ref_edit_act').val();
    var end_min = $('#Dialog_prod_insert_activity #end_time_min_ref_edit_act').val();
    var con_desc = $('#Dialog_prod_insert_activity #REFTH_ActCodeDesc').text();


    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((add_end_date - add_start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);

    var the_duration = Math.floor((add_end_date - add_start_date) / 60000);

    if (con_desc == "Invalid Code.") {
        $('#Dialog_prod_insert_activity #btn_prod').attr('disabled', true);
    } else if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $('#Dialog_prod_insert_activity #error_msg_time_ref').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $("#Dialog_prod_insert_activity #ref_duration").text("ERROR");
        $('#Dialog_prod_insert_activity #btn_prod').attr('disabled', true);
    } else {
        $('#Dialog_prod_insert_activity #error_msg_time_ref').html('Correct: <b>Time</b> is Good.');
        $("#Dialog_prod_insert_activity #ref_duration").text(the_dur);
        $("#Dialog_prod_insert_activity #rppd_totalduration").text(the_duration);
        $('#Dialog_prod_insert_activity #btn_prod').attr('disabled', false);
    }
    if (rppcheck_TotalDuration_prod_insert("#Dialog_prod_insert_activity", con_desc)) { }
}

/////////////////////--------------------------INSERT RPPDAILY ------/////////////////////////////////////////////








/////////////////////--------------------------ADD PLAN  RPPDAILY ------/////////////////////////////////////////////
function rppcheck_TotalDuration_plan(dialogname, actcode_val) {

    var TotalDuration = $("#rppTotalDuration").text();
    var currduration = $("#Dialog_prod_add_activity_plan #rppd_totalduration").text();
    var total = parseInt(TotalDuration) + parseInt(currduration);
    var i;
    if (total >= 1441) {
        alert("The 7 to 7 duty hours of this block is covered. Please select next date, time or block to add activity.");
        $(dialogname + " #btn_prod").attr("disabled", true);
        //$(dialogname + " .ref_code_desc_td").attr("disabled", true);
        //$(dialogname + " #REFTH_PP_Actcode").attr("disabled", true);
        i = false;
    } else {
        i = true;
    }
    return i;
}

//when selecting block assign specific time add
function Refinery_ActivityCodeperblock_plan(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);
            load_rppd_datetime_block_plan(dialogname, blockid);

        }
    });
}

function Refinery_ActivityCode_plan(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            get_default_time_per_ref_act_plan(dialogname, blockid, data.REFTH_PPcodeId);
            //load_rppd_datetime_block(dialogname, blockid);
            //get_default_time_per_ref_act_edit(dialogname, blockid, data.REFTH_PPcodeId);


            validation_ref_prodact_add_plan();
            //validation_ref_prodact_edit("REFTH_PP_Actcode");
            //validation_ref_prodact_insert();
            if (rppcheck_TotalDuration_plan(dialogname, actcode_val)) { }
        }
    });

}

function load_rppd_datetime_block_plan(dialogname, blockid) {

    var rpp_daily_date = $("#rpp_daily_date").val();

    $.ajax({
        url: serverpath + "/Refinery/load_rppd_datetime_block_plan/",
        data: {
            blockid: blockid,
            rpp_daily_date: rpp_daily_date
        },
        success: function (data) {
            var tmpdatalength = 0;
            tmpdatalength = data.length;
            var TotalDuration = $("#rppTotalDuration").text(0);
            if (tmpdatalength > 0 || tmpdatalength == undefined) {
                var TotalDuration = $("#rppTotalDuration").text(data.TotalDuration);

                if (rppcheck_TotalDuration(dialogname, blockid)) {
                    var sdate = formatDate(data.StartDateTime);
                    var eddate = formatDate(data.EndDateTime);

                    if (eddate > sdate) {
                        sdate = eddate;
                    } else {
                        sdate = sdate;
                    }

                    var blockid = data.BlockId;

                    var param = sdate.split(" ");
                    var sdate = param[0];


                    var times = param[1];
                    var paramr = times.split(':');
                    var hrs = paramr[0];
                    var mins = paramr[1];


                    var outstart_date = $(dialogname + ' #start_date_ref_add_act').val(sdate);

                    var fmins;
                    var fhrs;
                    if (mins == "00" || mins == "01" || mins == "02" || mins == "03" || mins == "04" || mins == "05" || mins == "06" || mins == "07" || mins == "08" || mins == "09") {
                        fmins = mins.charAt(1);
                        var oustart_min = $(dialogname + ' #start_time_min_ref_add_act').val(fmins);
                    } else {
                        var outstart_min = $(dialogname + ' #start_time_min_ref_add_act').val(mins);
                    }

                    if (hrs == "00" || hrs == "01" || hrs == "02" || hrs == "03" || hrs == "04" || hrs == "05" || hrs == "06" || hrs == "07" || hrs == "08" || hrs == "09") {
                        fhrs = hrs.charAt(1);
                        var outstart_hr = $(dialogname + ' #start_time_hr_ref_add_act').val(fhrs);
                    } else {
                        var outstart_hr = $(dialogname + ' #start_time_hr_ref_add_act').val(hrs);
                    }

                    //------------------------End date Value Assign-------

                    var params = eddate.split(" ");
                    var edate = params[0];


                    var time = params[1];
                    var paramss = time.split(':');
                    var hr = paramss[0];
                    var min = paramss[1];


                    var outend_date = $(dialogname + ' #end_date_ref_add_act').val(edate);

                    var fmin;
                    var fhr;
                    if (min == "00" || min == "01" || min == "02" || min == "03" || min == "04" || min == "05" || min == "06" || min == "07" || min == "08" || min == "09") {
                        fmin = min.charAt(1);
                        var outend_min = $(dialogname + ' #end_time_min_ref_add_act').val(fmin);
                    } else {
                        var outend_min = $(dialogname + ' #end_time_min_ref_add_act').val(min);
                    }

                    if (hr == "00" || hr == "01" || hr == "02" || hr == "03" || hr == "04" || hr == "05" || hr == "06" || hr == "07" || hr == "08" || hr == "09") {
                        fhr = hr.charAt(1);
                        var outend_hr = $(dialogname + ' #end_time_hr_ref_add_act').val(fhr);
                    } else {
                        var outend_hr = $(dialogname + ' #end_time_hr_ref_add_act').val(hr);
                    }
                    validation_ref_prodact_add_plan();
                    var actcode_val = $(dialogname + " #REFTH_PP_Actcode").val();
                    Refinery_ActivityCode_plan(actcode_val, dialogname);
                    //validation_ref_prodact_edit("REFTH_PP_Actcode");
                }
            }
        }
    });
}

function add_ref_prodact_by_duration_plan() {
    var ref_id = '';
    var key_idcnt = $("#Dialog_prod_add_activity_plan #REFTH_PPId").text();
    var blockid = $('#Dialog_prod_add_activity_plan #blockid').val();
    var REFTH_PP_Actcode_Id = $('#Dialog_prod_add_activity_plan #REFTH_PP_Actcode_Id').text();
    var rppd_totalduration = $("#Dialog_prod_add_activity_plan #rppd_totalduration").text();
    var rppd_proddate = $("#rpp_daily_date").val();
    var ref_prodact_note = $("#Dialog_prod_add_activity_plan #ref_prodact_note").val();

    if (blockid == "" || blockid == 0 || REFTH_PP_Actcode_Id == "") {

        alert("Please select block or Activity code.");
    } else {

        $.ajax({
            url: serverpath + '/Refinery/add_ref_prodact_by_duration_plan/',
            data: {
                ref_id: ref_id,
                blockid: blockid,
                REFTH_PP_Actcode_Id: REFTH_PP_Actcode_Id,
                rppd_totalduration: rppd_totalduration,
                rppd_proddate: rppd_proddate,
                ref_prodact_note: ref_prodact_note
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#Dialog_prod_add_activity_plan').dialog('close');
                if ($('#load_production_by_block').val() > 0) {
                    load_production_by_block();
                } else {
                    drawChart_plan();
                    drawChart_actual();
                    drawChart_MachineDowntime();
                }
                alert('Data now saved.');

            }
        });
    }
}

function validation_ref_prodact_add_plan() {

    $("#Dialog_prod_add_activity_plan .ref_code_desc_td").attr("disabled", false);
    $("#Dialog_prod_add_activity_plan #REFTH_PP_Actcode").attr("disabled", false);

    var add_s_date = new Date($('#Dialog_prod_add_activity_plan #start_date_ref_add_act').val());
    var s_hr = $('#Dialog_prod_add_activity_plan #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_prod_add_activity_plan #start_time_min_ref_add_act').val();


    var add_e_date = new Date($('#Dialog_prod_add_activity_plan #end_date_ref_add_act').val());
    var end_hr = $('#Dialog_prod_add_activity_plan #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_prod_add_activity_plan #end_time_min_ref_add_act').val();
    var con_desc = $('#Dialog_prod_add_activity_plan #REFTH_ActCodeDesc').text();

    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((add_end_date - add_start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);

    var the_duration = Math.floor((add_end_date - add_start_date) / 60000);

    if (con_desc == "Invalid Code.") {
        $("#Dialog_prod_add_activity_plan #btn_prod").attr("disabled", true);
    } else if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $("#Dialog_prod_add_activity_plan #error_msg_time_ref").html("ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.");
        $("#Dialog_prod_add_activity_plan #ref_duration").text("ERROR");
        $("#Dialog_prod_add_activity_plan #btn_prod").attr("disabled", true);
    } else {
        $("#Dialog_prod_add_activity_plan #error_msg_time_ref").html("Correct: <b>Time</b> is Good.");
        $("#Dialog_prod_add_activity_plan #ref_duration").text(the_dur);
        $("#Dialog_prod_add_activity_plan #rppd_totalduration").text(the_duration);
        $("#Dialog_prod_add_activity_plan #btn_prod").attr("disabled", false);

    }
    if (rppcheck_TotalDuration_plan("#Dialog_prod_add_activity_plan", con_desc)) { }
}

function get_default_time_per_ref_act_plan(dialogname, blockid, REFTH_PPcodeId) {
    var min_cnt = 0;
    if (blockid >= 1 && blockid <= 36) {
        switch (REFTH_PPcodeId) {
            case 1:
                min_cnt = 15;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 2:
                min_cnt = 300;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 3:
                min_cnt = 75;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 4:
                min_cnt = 1;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 5:
                min_cnt = 195;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 6:
                min_cnt = 1;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 7:
                min_cnt = 1;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 8:
                min_cnt = 1;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 9:
                min_cnt = 15;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
        }
    } else if (blockid >= 37 && blockid <= 48) {
        switch (REFTH_PPcodeId) {
            case 1:
                min_cnt = 15;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 2:
                min_cnt = 360;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 3:
                min_cnt = 75;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 4:
                min_cnt = 1;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 5:
                min_cnt = 195;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 6:
                min_cnt = 1;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 7:
                min_cnt = 1;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 8:
                min_cnt = 1;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 9:
                min_cnt = 15;
                get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
        }
    }
}

function get_act_default_time_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt) {


    var end_date = new Date($(dialogname + ' #start_date_ref_add_act').val());
    var end_hr = $(dialogname + ' #start_time_hr_ref_add_act').val();
    var end_min = parseInt($(dialogname + ' #start_time_min_ref_add_act').val()) + min_cnt;

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var end_mody = add_end_date_.toString("yyyy-MM-dd HH:mm:ss");

    var params = end_mody.split(" ");
    var ld = params[0];
    var sp = ld.split("-");
    var edate = sp[1] + '/' + sp[2] + '/' + sp[0];

    var time = params[1];
    var paramss = time.split(':');
    var hr = paramss[0];
    var min = paramss[1];


    var outend_date = $(dialogname + ' #end_date_ref_add_act').val(edate);
    var outend_hr = $(dialogname + ' #end_time_hr_ref_add_act').val(hr);
    var fmin;
    var fhr;
    if (min == 00 || min == 01 || min == 02 || min == 03 || min == 04 || min == 05 || min == 06 || min == 07 || min == 08 || min == 09) {
        fmin = min.charAt(1);
        var outend_min = $(dialogname + ' #end_time_min_ref_add_act').val(fmin);
    } else {
        var outend_min = $(dialogname + ' #end_time_min_ref_add_act').val(min);
    }

    if (hr == 00 || hr == 01 || hr == 02 || hr == 03 || hr == 04 || hr == 05 || hr == 06 || hr == 07 || hr == 08 || hr == 09) {
        fhr = hr.charAt(1);
        var outend_hr = $(dialogname + ' #end_time_hr_ref_add_act').val(fhr);
    } else {
        var outend_hr = $(dialogname + ' #end_time_hr_ref_add_act').val(hr);
    }

}

/////////////////////--------------------------ADD PLAN RPPDAILY ------/////////////////////////////////////////////
/////////////////////--------------------------INSERT PLAN RPPDAILY ------/////////////////////////////////////////////

function rppcheck_TotalDuration_prod_insert_plan(dialogname, actcode_val) {

    var TotalDuration = $("#rppTotalDuration").text();
    var currduration = $("#Dialog_prod_insert_activity_plan #rppd_totalduration").text();
    //var vardur = $("#Dialog_prod_insert_activity #rppd_totalduration_var").text();
    //var total = parseInt(TotalDuration) - parseInt(vardur);
    //var second_total = parseInt(total) + parseInt(currduration);
    var second_total = parseInt(TotalDuration) + parseInt(currduration);
    var i;
    if (second_total >= 1441) {
        alert("The 7 to 7 duty hours of this block is covered. Please select next date, time to add activity.");
        $("#Dialog_prod_insert_activity_plan #btn_prod").attr("disabled", true);
        //$(dialogname + " .ref_code_desc_td").attr("disabled", true);
        //$(dialogname + " #REFTH_PP_Actcode").attr("disabled", true);
        i = false;
    } else {
        i = true;
    }
    return i;
}

//when selecting block assign specific time insert
function Refinery_ActivityCodeperblock_insert_plan(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);          
            load_rppd_datetime_block_prod_insert_plan(dialogname, blockid);

        }
    });
}

function Refinery_ActivityCode_insert_plan(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);
            //load_rppd_datetime_block(dialogname, blockid);
            get_default_time_per_ref_act_edit(dialogname, blockid, data.REFTH_PPcodeId);


            validation_ref_prodact_insert_plan();
            //validation_ref_prodact_edit("REFTH_PP_Actcode");
            if (rppcheck_TotalDuration_prod_insert_plan(dialogname, actcode_val)) { }
        }
    });

}

//load data with no function(load_rppd_datetime_block) that will set deafault time 
function Refinery_ActivityCodeload_prodact_insert_plan(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //load_rppd_datetime_block(dialogname, blockid);
            //get_default_time_per_ref_act_edit(dialogname, blockid, data.REFTH_PPcodeId);


            //validation_ref_prodact_add();
            validation_ref_prodact_insert_plan("REFTH_PP_Actcode");
            //if (rppcheck_TotalDuration_prod_edit(dialogname, actcode_val)) { }
        }
    });

}

//load total duration and time for edit
function load_rppd_datetime_block_prod_insert_plan(dialogname, blockid) {

    var rpp_daily_date = $("#rpp_daily_date").val();

    $.ajax({
        url: serverpath + "/Refinery/load_rppd_datetime_block_plan/",
        data: {
            blockid: blockid,
            rpp_daily_date: rpp_daily_date
        },
        success: function (data) {
            var tmpdatalength = 0;
            tmpdatalength = data.length;
            var TotalDuration = $("#rppTotalDuration").text(0);
            if (tmpdatalength > 0 || tmpdatalength == undefined) {
                var TotalDuration = $("#rppTotalDuration").text(data.TotalDuration);

                if (rppcheck_TotalDuration_prod_insert_plan(dialogname, blockid)) {
                    var sdate = formatDate(data.StartDateTime);
                    var eddate = formatDate(data.EndDateTime);

                    if (eddate > sdate) {
                        sdate = eddate;
                    } else {
                        sdate = sdate;
                    }

                    var blockid = data.BlockId;

                    var param = sdate.split(" ");
                    var sdate = param[0];


                    var times = param[1];
                    var paramr = times.split(':');
                    var hrs = paramr[0];
                    var mins = paramr[1];


                    //var outstart_date = $(dialogname + ' #start_date_ref_edit_act').val(sdate);

                    //var fmins;
                    //var fhrs;
                    //if (mins == "00" || mins == "01" || mins == "02" || mins == "03" || mins == "04" || mins == "05" || mins == "06" || mins == "07" || mins == "08" || mins == "09") {
                    //    fmins = mins.charAt(1);
                    //    var oustart_min = $(dialogname + ' #start_time_min_ref_edit_act').val(fmins);
                    //} else {
                    //    var outstart_min = $(dialogname + ' #start_time_min_ref_edit_act').val(mins);
                    //}

                    //if (hrs == "00" || hrs == "01" || hrs == "02" || hrs == "03" || hrs == "04" || hrs == "05" || hrs == "06" || hrs == "07" || hrs == "08" || hrs == "09") {
                    //    fhrs = hrs.charAt(1);
                    //    var outstart_hr = $(dialogname + ' #start_time_hr_ref_edit_act').val(fhrs);
                    //} else {
                    //    var outstart_hr = $(dialogname + ' #start_time_hr_ref_edit_act').val(hrs);
                    //}

                    ////------------------------End date Value Assign-------

                    //var params = eddate.split(" ");
                    //var edate = params[0];


                    //var time = params[1];
                    //var paramss = time.split(':');
                    //var hr = paramss[0];
                    //var min = paramss[1];


                    //var outend_date = $(dialogname + ' #end_date_ref_edit_act').val(edate);

                    //var fmin;
                    //var fhr;
                    //if (min == "00" || min == "01" || min == "02" || min == "03" || min == "04" || min == "05" || min == "06" || min == "07" || min == "08" || min == "09") {
                    //    fmin = min.charAt(1);
                    //    var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(fmin);
                    //} else {
                    //    var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(min);
                    //}

                    //if (hr == "00" || hr == "01" || hr == "02" || hr == "03" || hr == "04" || hr == "05" || hr == "06" || hr == "07" || hr == "08" || hr == "09") {
                    //    fhr = hr.charAt(1);
                    //    var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(fhr);
                    //} else {
                    //    var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(hr);
                    //}
                    validation_ref_prodact_insert_plan();
                    var actcode_val = $(dialogname + " #REFTH_PP_Actcode").val();
                    //Refinery_ActivityCode_edit(actcode_val, dialogname);
                    //validation_ref_prodact_edit("REFTH_PP_Actcode");
                }
            }
        }
    });
}

function insert_ref_prodact_by_duration_plan() {

    var ref_id = $("#Dialog_prod_insert_activity_plan #REFTH_PPId").text();
    var key_idcnt = $("#Dialog_prod_insert_activity_plan #key_idcnt").text();
    var blockid = $('#Dialog_prod_insert_activity_plan #blockid').val();
    var REFTH_PP_Actcode_Id = $('#Dialog_prod_insert_activity_plan #REFTH_PP_Actcode_Id').text();
    var REFTH_ActDuration = $("#Dialog_prod_insert_activity_plan #rppd_totalduration").text();
    var rppd_proddate = $("#rpp_daily_date").val();
    var ref_prodact_note = $("#Dialog_prod_insert_activity_plan #ref_prodact_note").val();

    if (blockid == "" || blockid == 0 || REFTH_PP_Actcode_Id == "") {

        alert("Please select block or Activity code.");
    } else {

        $.ajax({
            url: serverpath + '/Refinery/insert_ref_prodact_by_duration_plan/',
            data: {
                ref_id: ref_id,
                blockid: blockid,
                REFTH_PP_Actcode_Id: REFTH_PP_Actcode_Id,
                rppd_totalduration: REFTH_ActDuration,
                rppd_proddate: rppd_proddate,
                ref_prodact_note: ref_prodact_note
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#Dialog_prod_insert_activity_plan').dialog('close');
                $("#Dialog_prodact_option_plan").dialog("close");
                if ($('#load_production_by_block').val() > 0) {
                    load_production_by_block();
                } else {
                    drawChart_plan();
                    drawChart_actual();
                    drawChart_MachineDowntime();
                }
                alert('Data now saved.');

            }
        });
    }
}

function validation_ref_prodact_insert_plan($this) {

    var this_dialog = "#" + $("#" + $this).closest('div.ui-dialog-content').attr('id');

    var add_s_date = new Date($('#Dialog_prod_insert_activity_plan #start_date_ref_edit_act').val());
    var s_hr = $('#Dialog_prod_insert_activity_plan #start_time_hr_ref_edit_act').val();
    var s_min = $('#Dialog_prod_insert_activity_plan #start_time_min_ref_edit_act').val();


    var add_e_date = new Date($('#Dialog_prod_insert_activity_plan #end_date_ref_edit_act').val());
    var end_hr = $('#Dialog_prod_insert_activity_plan #end_time_hr_ref_edit_act').val();
    var end_min = $('#Dialog_prod_insert_activity_plan #end_time_min_ref_edit_act').val();
    var con_desc = $('#Dialog_prod_insert_activity_plan #REFTH_ActCodeDesc').text();


    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((add_end_date - add_start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);

    var the_duration = Math.floor((add_end_date - add_start_date) / 60000);

    if (con_desc == "Invalid Code.") {
        $('#Dialog_prod_insert_activity_plan #btn_prod').attr('disabled', true);
    } else if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $('#Dialog_prod_insert_activity_plan #error_msg_time_ref').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $("#Dialog_prod_insert_activity_plan #ref_duration").text("ERROR");
        $('#Dialog_prod_insert_activity_plan #btn_prod').attr('disabled', true);
    } else {
        $('#Dialog_prod_insert_activity_plan #error_msg_time_ref').html('Correct: <b>Time</b> is Good.');
        $("#Dialog_prod_insert_activity_plan #ref_duration").text(the_dur);
        $("#Dialog_prod_insert_activity_plan #rppd_totalduration").text(the_duration);
        $('#Dialog_prod_insert_activity_plan #btn_prod').attr('disabled', false);
    }
    if (rppcheck_TotalDuration_prod_insert_plan("#Dialog_prod_insert_activity_plan", con_desc)) { }
}

/////////////////////--------------------------INSERT PLAN RPPDAILY ------/////////////////////////////////////////////
/////////////////////--------------------------EDIT PLAN RPPDAILY ------/////////////////////////////////////////////

//Validate if Duration of Edit already reached 24 hours
function rppcheck_TotalDuration_prod_edit_plan(dialogname, actcode_val) {

    var TotalDuration = $("#rppTotalDuration").text();
    var currduration = $("#Dialog_prod_edit_activity_plan #rppd_totalduration").text();
    var vardur = $("#Dialog_prod_edit_activity_plan #rppd_totalduration_var").text();
    var total = parseInt(TotalDuration) - parseInt(vardur);
    var second_total = parseInt(total) + parseInt(currduration);
    var i;
    if (second_total >= 1441) {
        alert("The 7 to 7 duty hours of this block is covered. Please select next date, time to add activity.");
        $("#Dialog_prod_edit_activity_plan #btn_prod").attr("disabled", true);
        //$(dialogname + " .ref_code_desc_td").attr("disabled", true);
        //$(dialogname + " #REFTH_PP_Actcode").attr("disabled", true);
        i = false;
    } else {
        i = true;
    }
    return i;
}

//when selecting block assign specific time edit
function Refinery_ActivityCodeperblock_edit_plan(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);          
            load_rppd_datetime_block_prod_edit_plan(dialogname, blockid);

        }
    });
}

function Refinery_ActivityCode_edit_plan(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //get_default_time_per_ref_act(dialogname, blockid, data.REFTH_PPcodeId);
            //load_rppd_datetime_block(dialogname, blockid);
            get_default_time_per_ref_act_edit_plan(dialogname, blockid, data.REFTH_PPcodeId);


            //validation_ref_prodact_add();
            validation_ref_prodact_edit_plan("REFTH_PP_Actcode");
            if (rppcheck_TotalDuration_prod_edit_plan(dialogname, actcode_val)) { }
        }
    });

}

//load data with no function(load_rppd_datetime_block) that will set deafault time 
function Refinery_ActivityCodeload_prodactedit_plan(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    var blockid = $(dialogname + ' #blockid').val();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }

            //load_rppd_datetime_block(dialogname, blockid);
            //get_default_time_per_ref_act_edit(dialogname, blockid, data.REFTH_PPcodeId);


            //validation_ref_prodact_add();
            validation_ref_prodact_edit_plan("REFTH_PP_Actcode");
            //if (rppcheck_TotalDuration_prod_edit(dialogname, actcode_val)) { }
        }
    });

}

//load total duration and time for edit
function load_rppd_datetime_block_prod_edit_plan(dialogname, blockid) {

    var rpp_daily_date = $("#rpp_daily_date").val();

    $.ajax({
        url: serverpath + "/Refinery/load_rppd_datetime_block_plan/",
        data: {
            blockid: blockid,
            rpp_daily_date: rpp_daily_date
        },
        success: function (data) {
            var tmpdatalength = 0;
            tmpdatalength = data.length;
            var TotalDuration = $("#rppTotalDuration").text(0);
            if (tmpdatalength > 0 || tmpdatalength == undefined) {
                var TotalDuration = $("#rppTotalDuration").text(data.TotalDuration);

                if (rppcheck_TotalDuration_prod_edit(dialogname, blockid)) {
                    var sdate = formatDate(data.StartDateTime);
                    var eddate = formatDate(data.EndDateTime);

                    if (eddate > sdate) {
                        sdate = eddate;
                    } else {
                        sdate = sdate;
                    }

                    var blockid = data.BlockId;

                    var param = sdate.split(" ");
                    var sdate = param[0];


                    var times = param[1];
                    var paramr = times.split(':');
                    var hrs = paramr[0];
                    var mins = paramr[1];


                    //var outstart_date = $(dialogname + ' #start_date_ref_edit_act').val(sdate);

                    //var fmins;
                    //var fhrs;
                    //if (mins == "00" || mins == "01" || mins == "02" || mins == "03" || mins == "04" || mins == "05" || mins == "06" || mins == "07" || mins == "08" || mins == "09") {
                    //    fmins = mins.charAt(1);
                    //    var oustart_min = $(dialogname + ' #start_time_min_ref_edit_act').val(fmins);
                    //} else {
                    //    var outstart_min = $(dialogname + ' #start_time_min_ref_edit_act').val(mins);
                    //}

                    //if (hrs == "00" || hrs == "01" || hrs == "02" || hrs == "03" || hrs == "04" || hrs == "05" || hrs == "06" || hrs == "07" || hrs == "08" || hrs == "09") {
                    //    fhrs = hrs.charAt(1);
                    //    var outstart_hr = $(dialogname + ' #start_time_hr_ref_edit_act').val(fhrs);
                    //} else {
                    //    var outstart_hr = $(dialogname + ' #start_time_hr_ref_edit_act').val(hrs);
                    //}

                    ////------------------------End date Value Assign-------

                    //var params = eddate.split(" ");
                    //var edate = params[0];


                    //var time = params[1];
                    //var paramss = time.split(':');
                    //var hr = paramss[0];
                    //var min = paramss[1];


                    //var outend_date = $(dialogname + ' #end_date_ref_edit_act').val(edate);

                    //var fmin;
                    //var fhr;
                    //if (min == "00" || min == "01" || min == "02" || min == "03" || min == "04" || min == "05" || min == "06" || min == "07" || min == "08" || min == "09") {
                    //    fmin = min.charAt(1);
                    //    var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(fmin);
                    //} else {
                    //    var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(min);
                    //}

                    //if (hr == "00" || hr == "01" || hr == "02" || hr == "03" || hr == "04" || hr == "05" || hr == "06" || hr == "07" || hr == "08" || hr == "09") {
                    //    fhr = hr.charAt(1);
                    //    var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(fhr);
                    //} else {
                    //    var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(hr);
                    //}
                    validation_ref_prodact_edit_plan();
                    var actcode_val = $(dialogname + " #REFTH_PP_Actcode").val();
                    //Refinery_ActivityCode_edit(actcode_val, dialogname);
                    //validation_ref_prodact_edit("REFTH_PP_Actcode");
                }
            }
        }
    });
}

function edit_ref_prodact_by_duration_plan() {
    var ref_id = $("#Dialog_prod_edit_activity_plan #REFTH_PPId").text();
    var key_idcnt = $("#Dialog_prod_edit_activity_plan #key_idcnt").text();
    var blockid = $('#Dialog_prod_edit_activity_plan #blockid').val();
    var REFTH_PP_Actcode_Id = $('#Dialog_prod_edit_activity_plan #REFTH_PP_Actcode_Id').text();
    var REFTH_ActDuration = $("#Dialog_prod_edit_activity_plan #rppd_totalduration").text();
    var rppd_proddate = $("#rpp_daily_date").val();
    var ref_prodact_note = $("#Dialog_prod_edit_activity_plan #ref_prodact_note").val();

    if (blockid == "" || blockid == 0 || REFTH_PP_Actcode_Id == "") {

        alert("Please select block or Activity code.");
    } else {

        $.ajax({
            url: serverpath + '/Refinery/edit_ref_prodact_plan/',
            data: {
                ref_id: ref_id,
                blockid: blockid,
                REFTH_PP_Actcode_Id: REFTH_PP_Actcode_Id,
                REFTH_ActDuration: REFTH_ActDuration,
                ref_prodact_note: ref_prodact_note
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#Dialog_prod_edit_activity_plan').dialog('close');
                $("#Dialog_prodact_option_plan").dialog("close");
                if ($('#load_production_by_block').val() > 0) {
                    load_production_by_block();
                } else {
                    drawChart_plan();
                    drawChart_actual();
                    drawChart_MachineDowntime();
                }
                alert('Data now saved.');

            }
        });
    }
}

function validation_ref_prodact_edit_plan($this) {

    var this_dialog = "#" + $("#" + $this).closest('div.ui-dialog-content').attr('id');

    var add_s_date = new Date($('#Dialog_prod_edit_activity_plan #start_date_ref_edit_act').val());
    var s_hr = $('#Dialog_prod_edit_activity_plan #start_time_hr_ref_edit_act').val();
    var s_min = $('#Dialog_prod_edit_activity_plan #start_time_min_ref_edit_act').val();


    var add_e_date = new Date($('#Dialog_prod_edit_activity_plan #end_date_ref_edit_act').val());
    var end_hr = $('#Dialog_prod_edit_activity_plan #end_time_hr_ref_edit_act').val();
    var end_min = $('#Dialog_prod_edit_activity_plan #end_time_min_ref_edit_act').val();
    var con_desc = $('#Dialog_prod_edit_activity_plan #REFTH_ActCodeDesc').text();


    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((add_end_date - add_start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);

    var the_duration = Math.floor((add_end_date - add_start_date) / 60000);

    if (con_desc == "Invalid Code.") {
        $('#Dialog_prod_edit_activity_plan #btn_prod').attr('disabled', true);
    } else if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $('#Dialog_prod_edit_activity_plan #error_msg_time_ref').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $("#Dialog_prod_edit_activity_plan #ref_duration").text("ERROR");
        $('#Dialog_prod_edit_activity_plan #btn_prod').attr('disabled', true);
    } else {
        $('#Dialog_prod_edit_activity_plan #error_msg_time_ref').html('Correct: <b>Time</b> is Good.');
        $("#Dialog_prod_edit_activity_plan #ref_duration").text(the_dur);
        $("#Dialog_prod_edit_activity_plan #rppd_totalduration").text(the_duration);
        $('#Dialog_prod_edit_activity_plan #btn_prod').attr('disabled', false);
    }

    if (rppcheck_TotalDuration_prod_edit_plan("#Dialog_prod_edit_activity_plan", con_desc)) { }
}

//get the default time when user selected activity code in edit by block
function get_default_time_per_ref_act_edit_plan(dialogname, blockid, REFTH_PPcodeId) {
    var min_cnt = 0;
    if (blockid >= 1 && blockid <= 36) {
        switch (REFTH_PPcodeId) {
            case 1:
                min_cnt = 15;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 2:
                min_cnt = 300;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 3:
                min_cnt = 75;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 4:
                min_cnt = 1;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 5:
                min_cnt = 195;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 6:
                min_cnt = 1;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 7:
                min_cnt = 1;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 8:
                min_cnt = 1;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 9:
                min_cnt = 15;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
        }
    } else if (blockid >= 37 && blockid <= 48) {
        switch (REFTH_PPcodeId) {
            case 1:
                min_cnt = 15;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 2:
                min_cnt = 360;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 3:
                min_cnt = 75;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 4:
                min_cnt = 1;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 5:
                min_cnt = 195;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 6:
                min_cnt = 1;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 7:
                min_cnt = 1;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 8:
                min_cnt = 1;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
            case 9:
                min_cnt = 15;
                get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt);
                break;
        }
    }
}

//get the default time when user selected activity code in edit
function get_act_default_time_edit_plan(dialogname, blockid, REFTH_PPcodeId, min_cnt) {


    var end_date = new Date($(dialogname + ' #start_date_ref_edit_act').val());
    var end_hr = $(dialogname + ' #start_time_hr_ref_edit_act').val();
    var end_min = parseInt($(dialogname + ' #start_time_min_ref_edit_act').val()) + min_cnt;

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var end_mody = add_end_date_.toString("yyyy-MM-dd HH:mm:ss");

    var params = end_mody.split(" ");
    var ld = params[0];
    var sp = ld.split("-");
    var edate = sp[1] + '/' + sp[2] + '/' + sp[0];

    var time = params[1];
    var paramss = time.split(':');
    var hr = paramss[0];
    var min = paramss[1];


    var outend_date = $(dialogname + ' #end_date_ref_edit_act').val(edate);
    var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(hr);
    var fmin;
    var fhr;
    if (min == 00 || min == 01 || min == 02 || min == 03 || min == 04 || min == 05 || min == 06 || min == 07 || min == 08 || min == 09) {
        fmin = min.charAt(1);
        var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(fmin);
    } else {
        var outend_min = $(dialogname + ' #end_time_min_ref_edit_act').val(min);
    }

    if (hr == 00 || hr == 01 || hr == 02 || hr == 03 || hr == 04 || hr == 05 || hr == 06 || hr == 07 || hr == 08 || hr == 09) {
        fhr = hr.charAt(1);
        var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(fhr);
    } else {
        var outend_hr = $(dialogname + ' #end_time_hr_ref_edit_act').val(hr);
    }

}

/////////////////////--------------------------EDIT PLAN RPPDAILY ------/////////////////////////////////////////////


function load_rpp_act_stream(streamid, dialog) {

    $(dialog + ' #act_code_table td').parent().remove();

    $.ajax({
        url: serverpath + '/Refinery/load_rpp_act_stream/',

        data: {
            streamid: streamid,
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $(dialog + ' #act_code_table tr:last').after('<tr>'
                    + '<td class="ref_code_td">' + value.REFTH_ActCode + '</td>'
                    + '<td class="ref_code_desc_td">' + value.REFTH_ActCodeDesc + '</td>'
                    );
            });
        }
    });
}





//----------------------------------------------------------------------End of function Events--------------------------------------------------------------------------------------------//