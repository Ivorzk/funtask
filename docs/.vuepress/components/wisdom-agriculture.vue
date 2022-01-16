<template>
<section class="funtask-wisdom-agriculture">
  <div class="container">
    <h3>智慧农场</h3>
    <img class="decoration"
      src="wisdom-agriculture/decoration_talk.png"
      alt="">
  </div>
  <div class="container">
    <img src="wisdom-agriculture/poster.png"
      class="poster">
    <dl>
      <dt>解决方案</dt>
      <dd>
        <div class="item">
          <img src="list-item.png"
            alt="">自动化灌溉系统
        </div>
        <div class="item">
          <img src="list-item.png"
            alt="">智能温控生态系统
        </div>
        <button>
          <a href="settled.html?type=agriculture">入驻申请<br>(农场主 硬件供应商)</a>
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
.funtask-wisdom-agriculture {
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
            width: 16.25vw;
            position: absolute;
            right: -13vw;
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
                    line-height: 1.5;
                    a {
                        color: #fff;
                    }
                }
            }
        }
    }
}
@media (max-width: 720px) {
    .funtask-wisdom-agriculture {
        padding: 12vw 0;

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
                        border-radius: 2vw;
                    }
                }
            }
        }
    }
}
</style>
