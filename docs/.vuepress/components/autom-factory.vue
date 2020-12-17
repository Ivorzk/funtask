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
            alt="">自动化灌溉系统
        </div>
        <div class="item">
          <img src="list-item.png"
            alt="">智能温控生态系统
        </div>
        <button>
          入驻申请<br>(农场主 硬件供应商)
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
                    align-items: top;
                    color: #59518E;
                    min-width: 15vw;
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
                }
            }
        }
    }
}
</style>
