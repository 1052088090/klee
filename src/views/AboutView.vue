<template>
  <div class="about-view">
    <div class="page-header">
      <h1 class="page-title">关于可莉</h1>
      <p class="page-description">了解更多关于火花骑士的信息</p>
    </div>

    <div class="about-content">
      <!-- 基础信息卡片 -->
      <div class="info-card">
        <h2 class="card-title">基础信息</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">姓名</span>
            <span class="info-value">可莉</span>
          </div>
          <div class="info-item">
            <span class="info-label">称号</span>
            <span class="info-value">火花骑士</span>
          </div>
          <div class="info-item">
            <span class="info-label">元素</span>
            <span class="info-value">火</span>
          </div>
          <div class="info-item">
            <span class="info-label">武器</span>
            <span class="info-value">法器</span>
          </div>
          <div class="info-item">
            <span class="info-label">稀有度</span>
            <span class="info-value">⭐⭐⭐⭐⭐</span>
          </div>
          <div class="info-item">
            <span class="info-label">所属</span>
            <span class="info-value">西风骑士团</span>
          </div>
        </div>
      </div>

      <!-- 角色介绍 -->
      <div class="info-card">
        <h2 class="card-title">角色介绍</h2>
        <div class="description-content">
          <p>可莉是西风骑士团的火花骑士，也是最受欢迎的成员之一。尽管年纪尚小，但她已经掌握了强大的火元素力量。</p>
          <p>她热爱冒险和探索，最喜欢的活动就是炸鱼。虽然经常因为过于热情而惹麻烦，但她的善良和活力总能感染身边的每一个人。</p>
          <p>可莉的母亲是著名的冒险家艾莉丝，她从母亲那里继承了对冒险的热爱和对炸弹的独特见解。</p>
        </div>
      </div>

      <!-- 特长 -->
      <!-- <div class="info-card">
        <h2 class="card-title">特长与爱好</h2>
        <div class="skills-grid">
          <div class="skill-item">
            <div class="skill-icon">💣</div>
            <h3>炸弹专家</h3>
            <p>擅长制作各种炸弹，特别是蹦蹦炸弹</p>
          </div>
          <div class="skill-item">
            <div class="skill-icon">🎣</div>
            <h3>炸鱼</h3>
            <p>最喜欢的活动，虽然被琴团长禁止</p>
          </div>
          <div class="skill-item">
            <div class="skill-icon">🌟</div>
            <h3>火元素</h3>
            <p>强大的火元素攻击能力</p>
          </div>
          <div class="skill-item">
            <div class="skill-icon">🧸</div>
            <h3>嘟嘟可</h3>
            <p>最好的朋友和玩伴</p>
          </div>
        </div>
      </div> -->

      <!-- 关系 -->
      <div class="info-card">
        <h2 class="card-title">人物关系</h2>
        <div class="relationships">
          <div class="relationship-item">
            <h3>琴</h3>
            <p>代理团长，经常需要处理可莉惹出的麻烦，但对她充满关爱</p>
          </div>
          <div class="relationship-item">
            <h3>阿贝多</h3>
            <p>可莉的大哥哥，炼金术师，经常照顾可莉</p>
          </div>
          <div class="relationship-item">
            <h3>艾莉丝</h3>
            <p>可莉的母亲，著名冒险家，教会了可莉很多知识</p>
          </div>
        </div>
      </div>

      <!-- 名言 -->
      <div class="info-card quotes-card">
        <h2 class="card-title">经典语录</h2>
        <div class="quotes">
          <blockquote>"哒哒哒~"</blockquote>
          <blockquote>"轰轰火花！"</blockquote>
          <blockquote>"可莉，向前冲！"</blockquote>
          <blockquote>"炸弹真好玩~"</blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.about-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  background-color: var(--card-bg);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 32px 24px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 12px var(--shadow);
  text-align: center;
  transition: all 0.3s ease;
}

.page-header:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px var(--shadow);
  border-color: var(--primary);
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 12px;
}

.page-description {
  color: var(--text-light);
  font-size: 16px;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-card {
  background-color: var(--card-bg);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 12px var(--shadow);
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px var(--shadow);
  border-color: var(--primary);
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: var(--bg);
  border-radius: 8px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.info-item:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
  box-shadow: 0 4px 8px var(--shadow);
}

.info-label {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 500;
}

.info-value {
  font-size: 16px;
  color: var(--text);
  font-weight: 600;
}

.description-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.description-content p {
  color: var(--text-light);
  line-height: 1.8;
  font-size: 15px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.skill-item {
  padding: 20px;
  background-color: var(--bg);
  border-radius: 8px;
  border: 1px solid var(--border);
  text-align: center;
  transition: all 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: 0 6px 15px var(--shadow);
}

.skill-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.skill-item h3 {
  font-size: 18px;
  color: var(--text);
  margin-bottom: 8px;
}

.skill-item p {
  color: var(--text-light);
  font-size: 14px;
  line-height: 1.6;
}

.relationships {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.relationship-item {
  padding: 16px;
  background-color: var(--bg);
  border-radius: 8px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.relationship-item:hover {
  transform: translateX(5px);
  border-color: var(--primary);
  box-shadow: 0 4px 10px var(--shadow);
}

.relationship-item h3 {
  font-size: 18px;
  color: var(--primary);
  margin-bottom: 8px;
}

.relationship-item p {
  color: var(--text-light);
  line-height: 1.6;
  font-size: 14px;
}

.quotes-card {
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.05), rgba(255, 127, 0, 0.05));
}

.quotes {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

blockquote {
  margin: 0;
  padding: 16px 20px;
  background-color: var(--card-bg);
  border-left: 4px solid var(--primary);
  border-radius: 8px;
  color: var(--text);
  font-style: italic;
  font-size: 16px;
  transition: all 0.3s ease;
}

blockquote:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 10px var(--shadow);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .page-header {
    padding: 24px 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-description {
    font-size: 14px;
  }

  .info-card {
    padding: 16px;
  }

  .card-title {
    font-size: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .description-content p {
    font-size: 14px;
  }

  .skill-item {
    padding: 16px;
  }

  .skill-icon {
    font-size: 40px;
  }

  .skill-item h3 {
    font-size: 16px;
  }

  .skill-item p {
    font-size: 13px;
  }

  .relationship-item h3 {
    font-size: 16px;
  }

  .relationship-item p {
    font-size: 13px;
  }

  blockquote {
    font-size: 15px;
    padding: 12px 16px;
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .info-item {
    padding: 12px;
  }
}
</style>
