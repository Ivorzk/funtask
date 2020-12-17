<template>
<section class="funtask-kv">
  <div class="container">
    <div class="poster">
      <img src="kv/poster.png"
        alt="funtask">
      <div class="text">
        <em>高效、快乐、人性化</em>
        <span>的多终端智能办公平台</span>
        <ui-button @click="donload">下载</ui-button>
      </div>
    </div>
    <div class="features">
      <dl>
        <dt>
          <img src="kv/features_fast.png"
            alt="">
        </dt>
        <dd><em>高效</em>巧用科技的力量帮你管理你的工作流，让你的
          效率倍速增长，四两拨千斤</dd>
      </dl>
      <dl>
        <dt>
          <img src="kv/features_happy.png"
            alt="">
        </dt>
        <dd><em>快乐</em>不断创新，让枯燥琐碎的工作变得有趣起来，
          哇哦！原来还有这么酷的工作方式~</dd>
      </dl>
      <dl>
        <dt>
          <img src="kv/features_humanized.png"
            alt="">
        </dt>
        <dd><em>人性化</em>你可以像搭积木一样，将不同功能组合在一
          起，打造一个属于你的工作平台
        </dd>
      </dl>
    </div>
  </div>
</section>
</template>
<script>
export default {
  methods: {
    // 下载
    donload() {}
  }
}
</script>
<style lang="scss">
.funtask-kv {
    position: relative;

    img {
        pointer-events: none;
    }

    .poster {
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
            width: 60%;
        }

        .text {
            em {
                display: block;
                font-style: normal;
                font-size: 1.875vw;
            }
            span {
                display: block;
                font-size: 1.28vw;
                margin: 0 0 1vw;
            }
        }
    }

    .features {
        display: flex;

        dl {
            flex: 1;

            dt {
                margin: 0;

                img {
                    display: block;
                    max-width: 6vw;
                }
            }

            dd {
                padding: 0 0 0 1.59vw;
                margin: 0;
                font-size: 0.8vw;

                em {
                    font-weight: bold;
                    font-style: normal;
                    font-size: 1.2vw;
                    margin-bottom: 0.2vw;
                    display: block;
                }
            }
        }
    }
}
</style>
