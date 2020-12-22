<template>
<section class="funtask-cooperative-office">
  <div class="container">
    <h3>协同办公</h3>
    <img class="decoration"
      src="cooperative-office/decoration.png"
      alt="">
  </div>
  <div class="container">
    <img src="cooperative-office/poster.png"
      class="poster">
    <dl>
      <dt>解决方案</dt>
      <dd>
        <div class="item">
          <img src="list-item.png"
            alt="">企业研发流程管理
        </div>
        <div class="item">
          <img src="list-item.png"
            alt="">个人超级工具箱
        </div>
        <button>
          <a href="settled.html">入驻申请<br>(团队 个人开发者)</a>
        </button>
      </dd>
    </dl>
  </div>
</section>
</template>
<script>
export default {
  methods: {}
}
</script>
<style lang="scss">
.funtask-cooperative-office {
    position: relative;
    padding: 3vw 0;
    .container {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img.poster {
            pointer-events: none;
            width: 26vw;
            margin-right: 5vw;
        }

        h3 {
            font-size: 1.28vw;
        }

        .decoration {
            width: 8vw;
            position: absolute;
            right: -6vw;
            top: 0;
        }

        dl {
            text-align: justify;

            dt {
                padding-bottom: 1vw;
                font-size: 1vw;
            }
            dd {
                padding: 1.28vw;
                box-shadow: 0 16px 85px rgba(246, 210, 189, 0.45);
                margin: 0;
                line-height: 2vw;
                border-radius: 1vw;
                position: relative;

                .item {
                    display: flex;
                    align-items: flex-start;
                    color: #59518E;
                    min-width: 15vw;
                    font-size: 1vw;
                    img {
                        width: 1.9vw;
                        margin-right: 1vw;
                    }
                }

                button {
                    position: absolute;
                    border: 0;
                    background: #FC601D;
                    box-shadow: 0 16px 85px rgba(246, 210, 189, 0.45);
                    border-radius: 10px;
                    padding: 0.3vw 0.5vw;
                    color: #fff;
                    text-align: center;
                    left: 50%;
                    transform: translateX(-50%);
                    cursor: pointer;
                    white-space: nowrap;
                    font-size: 0.8vw;
                    a {
                        color: #fff;
                    }
                }
            }
        }
    }
}
@media (max-width: 720px) {
    .funtask-cooperative-office {
        .container {
            display: block;
            h3 {
                font-size: 4.9vw;
            }
            img.poster {
                width: 90%;
                display: block;
                margin: auto;
            }
            .decoration {
                display: none;
            }
            dl {
                dt {
                    font-size: 3.9vw;
                    margin-bottom: 5vw;
                }
                dd {
                    line-height: 8vw;
                    padding: 5vw;
                    // box-shadow: none;
                    .item {
                        font-size: 3.9vw;
                        align-items: center;

                        img {
                            width: 4.9vw;
                            margin-top: 2.8vw;
                        }
                    }

                    button {
                        padding: 2vw 3.9vw;
                        font-size: 2.68vw;
                    }
                }
            }
        }
    }
}
</style>
