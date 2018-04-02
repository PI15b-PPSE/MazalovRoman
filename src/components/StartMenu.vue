<template>
    <div class="menu">
        <component v-bind:is="currentPage"></component>
    </div>
</template>

<script>
import StartMenuPage1 from './StartMenuPage1'
import StartMenuPage2 from './StartMenuPage2'


/**
 * Компонент StartMenu
 *
 * Компонент стартового меню приложения. В шаблон компонента добавлен элемент
 * component, который связан со свойством currentPage. Это позволяет изменять
 * отображаемые компоненты страниц стартового меню.
 *
 * @author      Роман Мазалов
 * @version     1.0.0
 * @copyright   The GNU General Public Lisense v3.0
 */

export default {
    /**
     * Имя компонента.
     *
     * Имя компонента стартового меню. Используется имя StartMenu.
     *
     * @var     string name
     */
    name: 'StartMenu',

    /**
     * Функция данных
     *
     * Функция data () возвращает объект со свойствами данных компонента.
     * Компонент содержит одно свойство {@link currentPage}.
     *
     * @return      object      Возвращает объект со свойствами компонента
     */
    data () {
        return {
            currentPage: 'StartMenuPage1'
        }
    },

    /**
     * Методы компонента
     *
     * Свойство хранит объект с методами компонента.
     *
     * @var     object methods
     */
    methods: {
        /**
         * Обработчик нажатия клавиш
         *
         * Обрабатывает нажатие клавиши Enter. При нажатии клавиши Enter
         * Устанавливается следующая страница с помощью метода
         * {@link getNextPage}.
         */
        nextPage (e) {
            if (e.keyCode === 13) {
                this.currentPage = this.getNextPage()
            }
        },

        /**
         * Получение компонента следующей страницы
         *
         * Функция получает следующее имя страницы из очереди компонентов
         * страниц.
         *
         * @return      string      Возвращает имя компонента следующей страницы
         */
        getNextPage: (function () {
            var queue = ['StartMenuPage1', 'StartMenuPage2', 'StartMenuPage3']

            return function () {
                return queue.shift()
            }
        })()
    },

    /**
     * Проигрывание звукового сопровождения стартового меню
     *
     * Функция вызывается после отображения содержимого в области. Циклически
     * проигрывает файл bdd_menu_intro.mp3 в стартовом меню.
     */
    mounted () {
        var audio = new Audio(require('../assets/sounds/bdd_menu_intro.mp3'))
        audio.loop = true
        audio.play()
    },

    /**
     * Установка обработчика нажатия клавиш
     *
     * Функция вызывается после создания экземпляра компонента. Устанавливает
     * метод {@link nextPage} для обработки нажатия клавиш.
     */
    created () {
        window.addEventListener('keypress', this.nextPage)
    },

    /**
     * Компоненты
     *
     * Свойство хранит компоненты, которые используются в этом компоненте.
     *
     * @var     array components
     */
    components: {
        StartMenuPage1,
        StartMenuPage2
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
    font-weight: normal;
}

.menu {
    flex: 1;
    position: relative;
}

.menu h2 {
    word-spacing: 8px;
    color: #984231;
    text-transform: uppercase;
    font-size: 22px;
}

.menu h3 {
    word-spacing: 8px;
    color: #E5F499;
    text-transform: uppercase;
    font-size: 20px;
}

.menu ul {
    position: relative;
    list-style-type: none;
    padding: 0;
    color: #E5F499;
    text-transform: uppercase;
    font-size: 20px;
}

.menu li::before {
    display: block;
    float: left;
    width: 35px;
    height: 25px;
    line-height: 25px;
    content: "• ";
    color: yellow;
    font-size: 80px;
}

.menu li{
    display: inline-block;
    line-height: 30px;
}

.menu p {
    margin: 0;
    word-spacing: 8px;
    color: #E5F499;
    text-transform: uppercase;
    font-size: 20px;
}
</style>
