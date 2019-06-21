
        // var  MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        //     '<div class="card">' +
        //         '<h4>Adress</h4>' +
        //         '<div class="container">' +
        //             '<ul>' +
        //                 '<li>first string 123</li>' +
        //                 '<li>second string 123</li>' +
        //                 '<li>third string 123</li>' + 
        //             '</ul>' +
        //             '<input type="text" name="name" placeholder="Введите имя">' +
        //             '<input type="text" name="place" placeholder="Введите название места">' +
        //             '<textarea type="text" name="comment" placeholder="Оставьте свой коментарий"></textarea>' +
        //             '<div class="addButton"><button class="button">Добавить</button>' +
        //         '</div>' +
        //     '</div>', {

        //     build: function () {
        //             this.constructor.superclass.build.call(this);

        //             this._$element = $('.popover', this.getParentElement());

        //             this.applyElementOffset();

        //             this._$element.find('.close')
        //                 .on('click', $.proxy(this.onCloseClick, this));
        //             },

        //     clear: function () {
        //             this._$element.find('.close')
        //                 .off('click');

        //             this.constructor.superclass.clear.call(this);
        //     },

        //     onSublayoutSizeChange: function () {
        //             MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

        //             if(!this._isElement(this._$element)) {
        //                 return;
        //             }

        //             this.applyElementOffset();

        //             this.events.fire('shapechange');
        //     },

        //     applyElementOffset: function () {
        //             this._$element.css({
        //                 left: -(this._$element[0].offsetWidth / 2),
        //                 top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
        //             });
        //     },

        //     onCloseClick: function (e) {
        //             e.preventDefault();

        //             this.events.fire('userclose');
        //     },

        //     getShape: function () {
        //             if(!this._isElement(this._$element)) {
        //                 return MyBalloonLayout.superclass.getShape.call(this);
        //             }

        //             var position = this._$element.position();

        //             return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
        //                 [position.left, position.top], [
        //                     position.left + this._$element[0].offsetWidth,
        //                     position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
        //                 ]
        //             ]));
        //     },