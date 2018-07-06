var organizeByTags = function (toDoObjects){
	//console.log("organizedByTags called");
	var organizedTags = [];
	toDoObjects.forEach(function(toDo){
		toDo.tags.forEach(function(tag){
			if(organizedTags.indexOf(tag)===-1){
				organizedTags.push(tag);
			}
		});
	});
	//console.log(organizedTags);

	var tagObjects = organizedTags.map(function(tag){
		var toDosWithTag = [];
		toDoObjects.forEach(function(toDo){
			if(toDo.tags.indexOf(tag)!==-1){
				toDosWithTag.push(toDo.description);
			}
		});
		return {"name": tag, "toDos": toDosWithTag};

	});
	//console.log(tagObjects);

	tagObjects.forEach(function(tag){
		var $tagName=$("<h3>").text(tag.name),
			$content = $("<ul>");

		tag.toDos.forEach(function(description){
			var $li = $("<li>").text(description);
			$content.append($li);
		});
		$("main .content").append($tagName);
		$("main .content").append($content);
	});
};


var main = function(toDoObjects){
	"use strict";
	//console.log("hello world!");
	/*var toDos = ["Get groceries",
				 "Make up some new ToDos",
				 "Prep for Monday's class",
				 "Answer emails",
				 "Take Gracie to the park",
				 "Finish writing this book"];
	*/
	var toDos = toDoObjects.map(function(toDo){
			return toDo.description;
		});
	$(".tabs span").toArray().forEach(function(element){
		var $element = $(element);

		//create a click handler for this element
		$(element).on("click", function(){
			var $content,
				$input,
				$button,
				i;


			$(".tabs span").removeClass("active");
			$(element).addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")){
				$content = $("<ul>");
				for (i= toDos.length-1;i>=0;i--){
					$content.append($("<li>").text(toDos[i]));
				}
			} else if ($element.parent().is(":nth-child(2)")){
				$content = $("<ul>");
				toDos.forEach(function (todo){
					$content.append($("<li>").text(todo));
				});
			} else if ($element.parent().is(":nth-child(3)")){
				organizeByTags(toDoObjects);
				
			} else if ($element.parent().is(":nth-child(4)")){
			/*	$input = $("<input>");
				$button = $("<button>").text("+");

				$button.on("click", function(){
					if ($input.val() !== ""){
						toDos.push($input.val());
						$input.val("");
					}
				});
				$content = $("<div>").append($input).append($button); */
				var $input = $("<input>").addClass("description"),
					$inputLabel=$("<p>").text("Description:"),
					$tagInput=$("<input>").addClass("tags"),
					$tagLabel = $("<p>").text("Tags:"),
					$button = $("<button>").text("+");
				$button.on("click", function(){
					var description = $input.val(),
						tags = $tagInput.val().split(",");
					toDoObjects.push({"description":description, "tags":tags});
					toDos = toDoObjects.map(function(toDo){
						return toDo.description;
					});
					$input.val("");
					$tagInput.val("");
				});

				$content = $("<div>").append($inputLabel)
									 .append($input)
									 .append($tagLabel)
									 .append($tagInput)
									 .append($button)

			}
			$("main .content").append($content);
			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");
};
//$(document).ready(main);
$(document).ready(function(){
	$.getJSON("to-dos.json", function(toDoObjects){
		main(toDoObjects);
	});
});