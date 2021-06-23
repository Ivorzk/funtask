<template>
<section class="funtask-autom-factory">
  <div class="container end">
    <img class="decoration"
      src="autom-factory/decoration.png"
      alt="">
    <h3>自动化工厂</h3>
  </div>
  <div class="container">
    <dl>
      <dt>解决方案</dt>
      <dd>
        <div class="item">
          <img src="list-item.png"
            alt="">全自动化生产流水线
        </div>
        <div class="item">
          <img src="list-item.png"
            alt="">中控智能化集中管理
        </div>
        <button>
          <a href="settled.html?type=factory">入驻申请<br>(工厂主 硬件供应商)</a>
        </button>
      </dd>
    </dl>
    <img src="autom-factory/poster.png"
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
.funtask-autom-factory {
    position: relative;
    padding: 3vw 0;
    background: #FAFAFA;
    .container {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &.end {
            justify-content: flex-end;
        }
        img.poster {
            pointer-events: none;
            width: 19.7vw;
            left: 0;
            margin-top: 0.8vw;
        }

        h3 {
            font-size: 1.28vw;
        }

        .decoration {
            width: 8.6vw;
            left: 0;
            position: absolute;
            left: -6vw;
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
                    margin-bottom: 0.5vw;
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
                    border-radius: 0.49vw;
                    padding: 0.39vw 0.68vw;
                    color: #fff;
                    text-align: center;
                    left: 50%;
                    transform: translateX(-50%);
                    cursor: pointer;
                    white-space: nowrap;
                    font-size: 0.69vw;

                    a {
                        color: #fff;
                    }
                }
            }
        }
    }
}
@media (max-width: 720px) {
    .funtask-autom-factory {
        padding: 12vw 0;
        .container {
            display: flex;
            flex-wrap: wrap;
            flex-wrap: wrap-reverse;

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
                width: 100%;
                dt {
                    font-size: 3.9vw;
                    margin-bottom: 5vw;
                }
                dd {
                    line-height: 8vw;
                    padding: 5vw;
                    .item {
                        font-size: 3.9vw;
                        align-items: center;
                        // flex-direction: row-reverse;
                        img {
                            width: 4.9vw;
                            margin-top: 2.8vw;
                        }
                    }

                    button {
                        padding: 2vw 3.9vw;
                        font-size: 2.68vw;
                        border-radius: 2vw;
                    }
                }
            }
        }
    }
}
</style>
