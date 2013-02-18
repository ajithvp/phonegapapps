var uid;
$(document).on('pageinit', '#home',  function(){

    $("#btnAttendance").live("click",function() {
        $.mobile.showPageLoadingMsg();
        $.mobile.changePage( "attendance.html", {
            transition: "slide",
            changeHash: true
        });
    });    
    $("#btnResults").live("click",function() {
        $.mobile.showPageLoadingMsg();
        $.mobile.changePage( "results.html", {
            transition: "slide",
            changeHash: true
        });
    });
    $("#btnAnnouncements").live("click",function() {
        $.mobile.showPageLoadingMsg();
        $.mobile.changePage( "announcements.html", {
            transition: "slide",
            changeHash: true
        });
    });
    $("#btnProfile").live("click",function() {
        $.mobile.showPageLoadingMsg();
        $.mobile.changePage( "profile.html", {
            transition: "slide",
            changeHash: true
        });
    });
    $("#btnExit").live("click",function() {
        $.mobile.showPageLoadingMsg();
        localStorage.removeItem("username");
        localStorage.removeItem("userid");
        localStorage.removeItem("profile");   
        $.mobile.changePage( "login.html", {
            transition: "slide",
            reverse: false,
            changeHash: false
        });
    }); 
    $("#btnReset").live("click", function() {
        $("#txtUserName").val("");
        $("#txtPassword").val("");
    });
    if(window.localStorage["username"] == undefined || window.localStorage["userid"] == undefined){
        var d = new Date();
        uid = "" + window.localStorage["userid"] + d.getFullYear() + d.getMonth() + d.getDate();
        $.mobile.changePage( "login.html", {
            transition: "slide",
            reverse: false,
            changeHash: false
        });
    }  
});

$(document).on('pageshow', '#home',  function(){
    if(window.localStorage["username"] == undefined || window.localStorage["userid"] == undefined){    
        var d = new Date();
        uid = "" + window.localStorage["userid"] + d.getFullYear() + d.getMonth() + d.getDate();
        $.mobile.changePage( "login.html", {
            transition: "slide",
            reverse: false,
            changeHash: false
        });
    }
});

$(document).on('pageshow', '#login',  function(){
    $("#btnLogin").click(function() {
        var username = $("#txtUserName").val().trim(); 
        var password = $("#txtPassword").val().trim();
        if(username == "" || password == ""){
            alert("Please Fill The Details Completely");
            return false;	
        }
        $.mobile.showPageLoadingMsg();
        $.ajax({
            type: "POST",
            url: url + "?op=do_login",
            data: {
                'username':username,
                'password':password
            },
            cache: true,
            dataType: "json",
            success: onSuccess,
            error: onerror
        });
        return false;
    });    
});

$(document).on('pagebeforeshow', '#attendanceDetails',  function(){
    $.mobile.showPageLoadingMsg();
    var attendanceid = getUrlVars()["id"];
    $(this).click(function(){
            $.mobile.showPageLoadingMsg();
            if(window.localStorage["attendanceid-"+uid+"-"+attendanceid] != undefined){
                data = JSON.parse(window.localStorage["attendanceid-"+uid+"-"+attendanceid]);
                showAttendanceDetails(data);
                return false;
            }
            $.ajax({
                type: "POST",
                url: url + "?op=show_attendance_details",
                data: {
                    'attendanceid':attendanceid
                },
                cache: true,
                dataType: "json",
                success: showAttendanceDetails,
                error: onerror
            });		
		
        });
});


$(document).on('pagebeforeshow', '#profile',  function(){
    $.mobile.showPageLoadingMsg();
    if(window.localStorage["profile"] != undefined){
        data = JSON.parse(window.localStorage["profile"]);
        showProfile(data);
        return false;
    }
    $.ajax({
        type: "POST",
        url: url + "?op=show_profile",
        data: {
            'userid':window.localStorage["userid"]
        },
        cache: true,
        dataType: "json",
        success: showProfile,
        error: onerror
    });		
});

$(document).on('pagebeforeshow', '#announcements',  function(){
    $.mobile.showPageLoadingMsg();
        if(window.localStorage["announcements-"+uid] != undefined){
            data = JSON.parse(window.localStorage["announcements-"+uid]);
            showAnnouncements(data);
            return false;
        }
        $.ajax({
            type: "POST",
            url: url + "?op=show_announcements",
            data: {	},
            cache: true,
            dataType: "json",
            success: showAnnouncements,
            error: onerror
        });		
});

$(document).on('pagebeforeshow', '#results',  function(){
    $.mobile.showPageLoadingMsg();
		
        if(window.localStorage["results-"+uid] != undefined){
            data = JSON.parse(window.localStorage["results-"+uid]);
            showResults(data);
            return false;
        }
		
        $.ajax({
            type: "POST",
            url: url + "?op=show_results",
            data: {
                'studentid' : window.localStorage["studentid"]
            },
            cache: true,
            dataType: "json",
            success: showResults,
            error: onerror
        });		
});

$(document).on('pagebeforeshow', '#attendance',  function(){
    $.mobile.showPageLoadingMsg();
		
        if(window.localStorage["attendance-"+uid] != undefined){
            data = JSON.parse(window.localStorage["attendance-"+uid]);
            showAttendance(data);
            return false;
        }
        $.ajax({
            type: "POST",
            url: url + "?op=show_attendance",
            data: {
                'studentid' : window.localStorage["studentid"]
            },
            cache: true,
            dataType: "json",
            success: showAttendance,
            error: onerror
        });		
});

var url = "http://www.topperseducation.com/webservices/ajax.php";
var heading = '<div style="width:100%; height:54px; background:url(images/icon.png) no-repeat; padding-left:60px;">';
heading += '<h1 style="color:#000000;padding-top:10px;">TOPPERS</h1>';
heading += '</div>'; 

function showProfile(data){
    if(window.localStorage["profile"] == undefined){
        window.localStorage["profile"] = JSON.stringify(data);
    }
    var check_off = '<a class="ui-btn-left ui-btn ui-btn-icon-notext" >';
    check_off += '	<span class="ui-btn">';
    check_off += '		<span class="ui-icon ui-icon-checkbox-off ">&nbsp;</span>';
    check_off += '	</span>';
    check_off += '</a> ';
    
    var check_on = '<a class="ui-btn-left ui-btn ui-btn-icon-notext" >';
    check_on += '	<span class="ui-btn">';
    check_on += '		<span class="ui-icon ui-icon-checkbox-on ">&nbsp;</span>';
    check_on += '	</span>';
    check_on += '</a> ';
    	
    var html = '';
    
    html += '<ul class="ui-listview ui-listview-inset ui-corner-all ">';
    html += '<li class="ui-li ui-li-divider ui-btn ui-bar-a ui-corner-top">' + data.Name + '</li>';
    html += '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"  >';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Admission No : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 40%; position: absolute; top: 50%; margin-top: -7px;" >';
    html +=				data.Userid;
    html += 		'</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Curriculam : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 40%; position: absolute; top: 50%; margin-top: -7px;" >'; 
    html += 			data.curriculam;
    html += '		</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Class : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 40%; position: absolute; top: 50%; margin-top: -7px;" >'; 
    html += 			data.class_name;
    html += '		</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Batch : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 40%;position: absolute; top: 50%; margin-top: -7px;" >'; 
    html += 			data.Batch;
    html += '		</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Division : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 40%;position: absolute; top: 50%; margin-top: -7px;" >'; 
    html += 			data.section_name;
    html += '		</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Parent Name : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 40%;position: absolute; top: 50%; margin-top: -7px;" >'; 
    html += 			data.Parent_name;
    html += '		</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Email : </span>';
    html += '				<br/><span style = "font-size:13px; " >' + data.Email1 + '</span>';
    html += '			</a>';
    html += '		</div>';
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Contact : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 40%;position: absolute; top: 50%; margin-top: -7px;" >'; 
    html += 			data.Contact_no1;
    html += '		</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">'; 
    html += '				<span style = "font-size:12px;" >&nbsp;</span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 40%;position: absolute; top: 5%; margin-top: -1px;" >'; 
    if(data.Maths == "yes" || data.Maths == "yes")
        html += check_on;
    else
        html += check_off;
    html += ' Maths';
    html += '';
    html += '		</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >&nbsp;</span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 40%;position: absolute; top: 5%; margin-top: -1px;" >'; 
    if(data.Physics == "yes" || data.Physics == "yes")
        html += check_on;
    else
        html += check_off;
    html += ' Physics';
    html += '		</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >&nbsp;</span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 40%;position: absolute; top: 5%; margin-top: -1px;" >'; 
    if(data.Chemistry == "yes" || data.Chemistry == "yes")
        html += check_on;
    else
        html += check_off;
    html += ' Chemistry';
    html += '		</span>'; 
    html += '	</div>';
    html += '</li>';		
    html += '</ul>';
    html = heading + html;
    $('.content',$('#profile')).html(html);
    
    $.mobile.hidePageLoadingMsg();
}

function showAnnouncements(data){

    if(window.localStorage["announcements-"+uid] == undefined){
        window.localStorage["announcements-"+uid] = JSON.stringify(data);
    }
    var html = '<br/>';
    $.each(data, function(i, obj) {
        
        html += '<li class="ui-btn ui-btn-icon-right ui-li ui-corner-all ui-btn-up-c" >';
        html += ' 	<div class="ui-btn-inner ui-li ui-corner-all">';
        html += '		<div class="ui-btn-text">';
        html += '			<a class="ui-link-inherit">';
        html += '				<h3 class="ui-li-heading">'+obj.title+'</h3>';
        html += '				<p class="ui-li-desc" style = "white-space: normal;" >' + obj.content + '</p>';
        html +=	'				Date : <strong>'+obj.date+'</strong>'; 
        html += '			</a>';
        html += '		</div>';
        html += '	</div>';
        html += '</li>';
		
    });
    html = heading + html;
    $('.content',$('#announcements')).html(html);
    $.mobile.changePage( "#announcements", {
        transition: "slide",
        changeHash: true
    });
    $.mobile.hidePageLoadingMsg();
}

function showAttendance(data){

    if(window.localStorage["attendance-"+uid] == undefined){
        window.localStorage["attendance-"+uid] = JSON.stringify(data);
    }

    var html = '',isPresent ;
    
    html += '<ul class="ui-listview ui-listview-inset ui-corner-all ">';
    $.each(data, function(i, obj) {
        isPresent = "Not Present";
        if(obj.Present == "Yes" || obj.Present == "yes")
            isPresent = "Present";
        html += '<li class="details ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-all ui-btn-up-c" id = "'+obj.id+'" >';
        html += ' 	<div class="ui-btn-inner ui-li ui-corner-all">';
        html += '		<div class="ui-btn-text">';
        html += '			<a class="ui-link-inherit">';
        html += '				<strong>' + obj.Date + '</strong>';
        html += '				<br/>';
        html +=	'				<span style="font-size:12px;">' + isPresent + '</span>'; 
        html += '			</a>';
        html += '		</div>';
        html += '		<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>';
        html += '	</div>';
        html += '</li>';		
    });
    html += '</ul>';
    html = heading + html;
    $('.content',$('#attendance')).html(html); 

    $('.details').each(function(){
        var attendanceid = $(this).attr('id');
        $(this).live("click", function(){
            $.mobile.showPageLoadingMsg();
            $.mobile.changePage( "attendance-details.html?id="+attendanceid, {
        	transition: "slide",	
        	changeHash: true
    });
		
        });
    });
    $.mobile.hidePageLoadingMsg();
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function showAttendanceDetails(data){
	alert("ddd");
    if(window.localStorage["attendanceid-"+uid+"-"+data.id] == undefined){
        window.localStorage["attendanceid-"+uid+"-"+data.id] = JSON.stringify(data);
    }
    alert(JSON.stringify(data));
    var html = ''; 
    html += '<ul class="ui-listview ui-listview-inset ui-corner-all ">';
    html += '<li class="ui-li ui-li-divider ui-btn ui-bar-a ui-corner-top">' + data.Date + '</li>';
    html += '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"  >';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Listening in Class : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 50%; position: absolute; top: 50%; margin-top: -7px;" >';
    html +=				data.Listening;
    html += 		'</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Noting Points : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 50%; position: absolute; top: 50%; margin-top: -7px;" >'; 
    html += 			data.Noting_points;
    html += '		</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Overall Behaviour : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 50%; position: absolute; top: 50%; margin-top: -7px;" >'; 
    html += 			data.Behaviour;
    html += '		</span>'; 
    html += '	</div>';
    html += ' 	<div class="ui-btn-inner ui-li ">';
    html += '		<div class="ui-btn-text">';
    html += '			<a class="ui-link-inherit">';
    html += '				<span style = "font-size:12px;" >Worksheet : </span>';
    html += '			</a>';
    html += '		</div>';
    html += '		<span style = "font-size:13px; margin-left: 50%;position: absolute; top: 50%; margin-top: -7px;" >'; 
    html += 			data.Worksheet;
    html += '		</span>'; 
    html += '	</div>';
    html += '</li>';		
    html += '</ul>';
    html = heading + html;
    $('.content',$('#attendanceDetails')).html(html); 
    $.mobile.hidePageLoadingMsg();
}

function showResults(data){

    if(window.localStorage["results-"+uid] == undefined){
        window.localStorage["results-"+uid] = JSON.stringify(data);
    }

    html = '';
    html += '<ul class="ui-listview ui-listview-inset ui-corner-all ">';
    $.each(data, function(i, obj) {
        html += '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-all ui-btn-up-c"  >';
        html += ' 	<div class="ui-btn-inner ui-li ui-corner-all">';
        html += '		<div class="ui-btn-text">';
        html += '			<a class="ui-link-inherit">';
        html += '				<strong>' + obj.subject + '</strong>';
        html += '				<br/>';
        html +=	'				<span style="font-size:12px;">' + obj.date + '</span>'; 
        html += '			</a>';
        html += '		</div>';
        html += '		<span style = "right: 15%; margin-right: -9px;position: absolute; top: 50%; margin-top: -9px;" >'+ obj.mark+'</span>'; 
        html += '	</div>';
        html += '</li>';		
    });
    html += '</ul>';
    html = heading + html;
    $('.content',$('#results')).html(html);
    $.mobile.hidePageLoadingMsg();
}


function onSuccess(data){
    if(data.Name != undefined){
        window.localStorage["username"] = data.Name;
        window.localStorage["userid"] = $("#txtUserName").val().trim();
        window.localStorage["studentid"] = data.id;
        var d = new Date();
        uid = "" + window.localStorage["userid"] + d.getFullYear() + d.getMonth() + d.getDate();
        $.mobile.changePage( "index.html", {
            transition: "slide",
            reverse: false,
            changeHash: false
        });
    }
    else{
        alert("Incorrect Login");
        $("#txtUserName").val("");
        $("#txtPassword").val("");
    }
    $.mobile.hidePageLoadingMsg();
    $("#txtUserName").val("");
    $("#txtPassword").val("");
}

function onerror(data){
    alert("Error In Your Internet Connection");
    $.mobile.hidePageLoadingMsg();
    $("#txtUserName").val("");
    $("#txtPassword").val("");
}
