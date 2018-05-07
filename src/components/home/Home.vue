<template>
  <component v-bind:is="currentPage"></component>
</template>

<script>
import StartMenuPage1 from '../startmenu/StartMenuPage1.vue'
import StartMenuPage2 from '../startmenu/StartMenuPage2.vue'
import StartMenuPage3 from '../startmenu/StartMenuPage3.vue'
import GameOver from '../startmenu/GameOver.vue'
import PlayerWon from '../startmenu/PlayerWon.vue'
import Game from '../game/Game.vue'

/**
 * Компонент Home
 *
 * Главный компонент приложения. В шаблон компонента добавлен элемент
 * component, который связан со свойством currentPage. Это позволяет изменять
 * отображаемые компоненты приложения.
 *
 * @author      Роман Мазалов
 * @version     1.0.0
 * @copyright   The GNU General Public Lisense v3.0
 */

export default {
    /**
     * Имя компонента.
     *
     * Имя компонента стартового меню. Используется имя Home.
     *
     * @var     string name
     */
    name: 'home',

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
            currentPage: 'StartMenuPage1',
            queue: ['StartMenuPage1', 'StartMenuPage2', 'StartMenuPage3']
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
        switchPage (page) {
            this.currentPage = page
        },
        /**
         * Обработчик нажатия клавиш
         *
         * Обрабатывает нажатие клавиши Enter. При нажатии клавиши Enter
         * Устанавливается следующая страница с помощью метода
         * {@link getNextPage}.
         */
        nextPage (e) {
            if (this.currentPage !== 'GameOver' && this.currentPage !== 'game') {
                if (e.keyCode === 13) {
                    var page = this.getNextPage()

                    if (page !== undefined) {
                        this.currentPage = page
                    } else {
                        this.currentPage = 'game'
                        console.log(this.$children[0])
                        this.$children[0].recreateGame()
                    }
                }
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
        getNextPage () {
            return this.queue.shift()
        },
        resetPageQueue () {
            this.queue = ['StartMenuPage1', 'StartMenuPage2', 'StartMenuPage3']
        }
    },

    /**
     * Проигрывание звукового сопровождения стартового меню
     *
     * Функция вызывается после отображения содержимого в области. Циклически
     * проигрывает файл bdd_menu_intro.mp3 в стартовом меню.
     */
    mounted () {
        var audio = new Audio(require('../../../assets/sounds/bdd_menu_intro.mp3'))
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
    destroyed () {
        window.removeEventListener('keypress', this.nextPage)
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
        StartMenuPage2,
        StartMenuPage3,
        Game,
        GameOver,
        PlayerWon
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

#logo img {
    width: 600px;
    height: auto;
}
</style>
