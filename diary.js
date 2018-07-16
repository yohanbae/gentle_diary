var app = angular.module('diaryApp', []);
app.controller('DiaryCtrl', ['$scope', '$http', function($scope, $http){

//	$scope.tasks = JSON.parse(localStorage.getItem('WEEK_O_DATA'));
//	localStorage.setItem('WEEK_W_DATA', JSON.stringify($scope.tasks));




	var ddd = new Date();
	$scope.todayDate = Date.now();
	$scope.datas=JSON.parse(localStorage.getItem('DIARY'));
	$scope.newDiary="";
	$scope.editDiary="";


/*
	$scope.datas = [
		{id:1, diary:'Day 1', date:ddd.getDate()-0},
		{id:2, diary:'Day 2', date:ddd.getDate()-1},

	];
*/
	diary_picked="";

	$scope.closebox = function(){
		if($(".write").hasClass('write-active')){
			$(".write").removeClass('write-active');			
			post();
		}
		if($(".edit").hasClass('edit-active')){
			$(".edit").removeClass('edit-active');
			edit();
		}
		//update();
		diary_picked = "";
	}

	function edit() {
		for(i=0; i < $scope.datas.length ; i++){
			if($scope.datas[i].id == diary_picked){
				$scope.datas[i].diary = $("textarea#note_edit").val();				
			}
		}
		localStorage.setItem('DIARY', JSON.stringify($scope.datas));		
	}

	function post(){
/*
		var dd = $('textarea#note').val();
		dd = dd.replace(/)*/

		var newId = $scope.datas.length + 1;
		var newPost = {
			id: newId,
			diary: $scope.newDiary,
			date: Date.now()
		};
		$scope.datas.push(newPost);
		console.log($scope.datas);
		localStorage.setItem('DIARY', JSON.stringify($scope.datas));		
	}

	$scope.write_diary = function(){
		var today = Date.now();
		today = new Date(today);
		today.setHours(0,0,0,0);

		var total = $scope.datas.length;
		if(total > 0){
			var tt = $scope.datas.length - 1;
			var date_b = $scope.datas[tt].date; 
			var	id_b = $scope.datas[tt].id;
			var	diary_b = $scope.datas[tt].diary;			
			var diary_date = new Date(date_b); diary_date.setHours(0,0,0,0);	

			if(today > diary_date){
				console.log('CREATE');			
				if (!$(".write").hasClass("write-active")) {			
					$(".write").addClass('write-active');
				}			
			}else if(today = diary_date){
				console.log('EDIT');
				if (!$(".edit").hasClass("edit-active")) {			
					$(".edit").addClass('edit-active');

					diary_picked = id_b;
					//$("textarea#note_edit").val(diary_b);
					$scope.editDiary = diary_b;
				}
			}
					
		}else{
			if (!$(".write").hasClass("write-active")) {			
				$(".write").addClass('write-active');
			}					
		}

	}


	$scope.called = function(id, diary, date){
		var date_b = date; var id_b = id; var diary_b = diary;
		for(i=0; i < $scope.datas.length ; i++){
			if($scope.datas[i].id == id){
				diary_b = $scope.datas[i].diary;							
			}			
		}
		if (!$(".edit").hasClass("edit-active")) {			
			$(".edit").addClass('edit-active');
		}
		$scope.editDiary = diary_b;
		diary_picked = id;
	}
/*
에디터로 부를시에는,
TEMPORARY NG-MODEL 을 하나 만들어서, 거기다가 기존의 일기를 집어넣고,
저장할 때는, 기존의 인기를 지우고.
새로운 일기를 같은 날짜에 업데이트 한다.
그..동영상 참고해야 할듯. 
*/



}]);