<template>
<section class="funtask-about">
  <div class="container">
    <dl>
      <dt>About Funtask<br>Funtask简介</dt>
      <dd>
        物联网日益发展, 于此对应的就需要为这些lot硬件提供相应的控制终端, 而对于用户而言需要在这些不同的控制终端来回切换操作增加了操作的复杂性, 交互体验差, Funtask 统一和规范了控制端, 使其成为一个标准化 模块化 和开放化的办公平台真正做到, 根据用户的需要, 提供对应的功能模块, 避免无关的功能干扰工作, 从而提升用户的办公体验.
      </dd>
    </dl>
    <img src="about/poster.png"
      class="poster">
  </div>
</section>
</template>
<script>
export default {
  methods: {}
}
</script>
<style lang="scss">
.funtask-about {
    position: relative;
    padding: 3vw 0;
    background: #FAFAFA;
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
            pointer-events: none;
            width: 26vw;
            flex-shrink: 0;
            margin-left: 5vw;
        }

        dl {
            text-align: justify;
            background: #fff;
            padding: 2vw;
            border-radius: 1vw;
            box-shadow: 0 16px 85px rgba(246, 210, 189, 0.45);
            text-align: justify;
            max-width: 50%;

            dt {
                padding-bottom: 1vw;
                font-size: 1.2vw;
            }
            dd {
                margin: 0;
                line-height: 2vw;
                font-size: 0.9vw;
            }
        }
    }
}
@media (max-width: 720px) {
    .funtask-about {
        .container {
            flex-direction: column-reverse;
            flex-wrap: wrap;
            img {
                width: 80%;
                display: block;
                margin: auto;
            }

            dl {
                width: calc(100% - 10px);
                box-shadow: none;
                border-radius: 0;
                background: transparent;
                padding: 0;
                margin: 3vw 0;
                dt {
                    padding-bottom: 1vw;
                    font-size: 4vw;
                }
                dd {
                    margin: 0;
                    line-height: 2vw;
                    font-size: 3.2vw;
                    line-height: 6vw;
                }
            }
        }
    }
}
</style>
