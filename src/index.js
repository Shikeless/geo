import { mapInit } from './js/ymaps';

window.onload = mapInit();

		var pa = document.querySelector("#pa");
		console.log(pa);
		console.log(map);

		function creating() {
			var pos = document.createElement('div')
			pos.id = "pos";
			pos.classList = "card"
			console.log(pos)
			var h4 = document.createElement('h4')
			h4.id = "header";
			var container = document.createElement('div')
			container.classList = "container";
			var comBox = document.createElement('div');
			comBox.id = "com-box";
			comBox.classList = "com-box";
			var h3 = document.createElement('h3');
			h3.innerHTML = "ВАШ ОТЗЫВ"
			var nameInput = document.createElement('input');
			nameInput.id = "name";
			nameInput.type = "text";
			nameInput.name= "name";
			nameInput.placeholder = "Введите имя";
			var placeInput = document.createElement('input');
			placeInput.id = "place";
			placeInput.type = "text";
			placeInput.name= "place";
			placeInput.placeholder = "Введите название места";
			// var com = document.createElement('textarea');
			// com.id = "comment";
			// com.type = "text";
			// com.name= "comment";
			// com.placeholder = "Оставьте свой коментарий";
			console.log(nameInput);
			var addDiv = document.createElement('div');
			addDiv.align = "right";
			addDiv.style = "transform: translateY(-45px);"
			console.log(addDiv);
			var but = document.createElement('button');
			but.id = "addButton";
			but.classList = "button";
			but.textContent = "Добавить"
			pos.appendChild(h4);
			pos.appendChild(container);
			container.appendChild(comBox);
			container.appendChild(h3);
			container.appendChild(nameInput);
			container.appendChild(placeInput);
			// container.appendChild(com);
			container.appendChild(addDiv);
			addDiv.appendChild(but);
			pa.appendChild(pos);
		}
		creating();







        // document.addEventListener('click', function(e) {
                           

        //                 // var source = document.getElementById("entry-template").innerHTML; //определяем шаблон как переменную
        //                 // var template = Handlebars.compile(source);  //компилируем шаблон
        //                 // var html = template(data);
        //                 // const comBox = document.querySelector('#com-box')
        //                 // comBox.innerHTML = html;
                
        //                 document.getElementById('pos').style.left = e.clientX;
        //                 document.getElementById('pos').style.top = e.clientY;
        //                 document.getElementById('pos').style.display='block';
                        
                    
        //         });


