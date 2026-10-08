const q = (s, r=document) => r.querySelector(s);
const qa = (s, r=document) => [...r.querySelectorAll(s)];

const topbar = q("[data-topbar]");
const menuBtn = q("[data-menu]");
const modal = q("[data-modal]");
const toast = q("[data-toast]");

const characterData = {
  unkaku: {
    title:"雲鶴", badge:"ANNIVERSARY / SECOND ACT", role:"メインアタッカー", symbol:"雲",
    origin:"？？？", faction:"なし", gender:"女", element:"血", weapon:"爪",
    quote:"「相棒」リンちゃん――それは愛称ではなく、契約共同体そのもの。",
    skill:"重撃でスキルが変化し、スタミナと引き換えに倍率上昇。通常スキルは血ダメージの斬撃を3回、特殊スキルはさらにリンちゃんを召喚して継続する血ダメージを一度付与。スキルで戒積値を35/50蓄積し、100でウルトラスキルが可能。不死鳥リンちゃん中はダメージ50%軽減＋高倍率の血ダメージ。非戦闘時はスタミナを消費して飛行できる。固有特性二ではスキルCTを攻撃ダメージに応じて短縮。"
  },
  gensho: {
    title:"玄昌", badge:"ANNIVERSARY / FIRST ACT", role:"シールド / バッファー", symbol:"玄",
    origin:"刻、内大金グレーティ議会保護領", faction:"グレーティ議会", gender:"男", element:"斬", weapon:"大剣",
    quote:"防御こそが、味方全員を包むもう一つの刃。",
    skill:"スキルでチーム全体へ防御力参照のシールドと攻撃力バフを付与。玄昌自身の防御力500ごとに10%ずつ、最大3000まで上昇。ウルトラスキルはチーム全体の防御力を参照して最大400%の斬ダメージ。固有特性で直撃を付与し、敵防御を70%無視＋一定期間の斬耐性30%低下。"
  },
  ester: {
    title:"エスター", badge:"ANNIVERSARY / FIRST ACT", role:"バッファー", symbol:"星",
    origin:"岷、星天舞降地", faction:"烏胡会", gender:"女", element:"斬", weapon:"法器",
    quote:"力をひとつに束ねる会長。斬と血の境界を、ひとつの致命へ変える。",
    skill:"スキルで移動速度とエスターの基礎攻撃力に応じた攻撃力バフ、周囲へ継続斬ダメージのフィールドを展開。ウルトラスキルは魔力・防御力・攻撃力をそれぞれ参照してチーム全体を強化し、味方攻撃へ斬追撃を付与。固有特性では斬と血の組み合わせから致命斬撃を発生させ、初回のみ敵をクラッシュ。クラッシュ値0で敵を不能化し、復活時に耐久値が全回復する。"
  },
  karin: {
    title:"カリン", badge:"ANNIVERSARY / SECOND ACT", role:"サブアタッカー", symbol:"悪",
    origin:"那", faction:"砂漠の民ウィーア派", gender:"悪魔", element:"悪", weapon:"法器",
    quote:"羊飼にして下位悪魔。芸者、踊子、幇間――分身が彼女の術式そのもの。",
    skill:"スキルで分身『芸者』を生成。芸者はランダムな敵に取り憑き悪ダメージを与え、周囲に持続悪ダメージの小型フィールドを残す。ダメージごとに別の敵へ移動し、敵が一人なら移動しない。累積ダメージで再使用可能となり、次は『踊子』を召喚可能。ウルトラスキルは全ダメージ耐性を低下させるフィールドを展開し、分身がいる場合は『幇間』を追加召喚。固有特性では亡者/幇間の初回攻撃に防御30%低下を付与。"
  },
  perun: {
    title:"ペルン", badge:"REVIVAL", role:"アタッカー", symbol:"海",
    origin:"クフラター、ルヴィ島", faction:"海洋騎士団テルミア", gender:"女", element:"血", weapon:"短剣",
    quote:"潮流のように速く、血の斬撃を重ねる海洋騎士。",
    skill:"スキルで自身の攻撃へ血ダメージを付与し、周囲へ血ダメージの斬撃×3。命中時は移動速度20%上昇。ウルトラスキルで高倍率の血ダメージ＋一定期間攻撃力40%上昇、通常攻撃速度20%上昇。固有特性で泳ぎのスタミナ消費20%減少、固有特性二で自身が与えた血ダメージの3%を回復。"
  },
  otrok: {
    title:"オトロク", badge:"REVIVAL", role:"ヒーラー", symbol:"光",
    origin:"アリヤ、高貴なる都ブラゴロドヌ", faction:"アリヤン教会", gender:"男", element:"光", weapon:"法器",
    quote:"一度だけ、死を拒む。神父ジヴォートと共に祈りを届ける。",
    skill:"スキルでチーム全体の魔力を参照した持続回復を付与（魔力300ごとに500、最大1200）。ウルトラスキルで神父ジヴォートを召喚し、オトロクの魔力に応じたチーム回復と敵への高倍率光ダメージ。固有特性『神父の加護』では戦闘不能になるダメージを受けた際、一度だけHP1で耐え、1.2秒間攻撃を無効化するバリアを得る。"
  }
};

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(()=>toast.classList.remove("show"), 2600);
}

function openCharacter(key){
  const d = characterData[key];
  if(!d) return;
  q("[data-modal-title]").textContent = d.title;
  q("[data-modal-badge]").textContent = d.badge;
  q("[data-modal-role]").textContent = d.role;
  q("[data-modal-symbol]").textContent = d.symbol;
  q("[data-modal-quote]").textContent = d.quote;
  q("[data-modal-origin]").textContent = d.origin;
  q("[data-modal-faction]").textContent = d.faction;
  q("[data-modal-gender]").textContent = d.gender;
  q("[data-modal-element]").textContent = d.element;
  q("[data-modal-weapon]").textContent = d.weapon;
  q("[data-modal-skill]").textContent = d.skill;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

qa("[data-character]").forEach(el => el.addEventListener("click", () => openCharacter(el.dataset.character)));
qa("[data-close]", modal).forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if(e.key === "Escape") closeModal();
});

qa(".banner-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    qa(".banner-tab").forEach(t => {
      const active = t === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    });
    qa(".banner-panel").forEach(panel => {
      const active = panel.dataset.panel === target;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
  });
});

let summonCount = Number(localStorage.getItem("anniversary-summon-count") || 0);
const featured = ["エスター", "玄昌", "ペルン", "雲鶴", "カリン", "オトロク"];
qa("[data-summon]").forEach(btn => btn.addEventListener("click", () => {
  summonCount += 1;
  localStorage.setItem("anniversary-summon-count", String(summonCount));
  const pick = featured[(summonCount - 1) % featured.length];
  showToast("周年召集記録 #" + String(summonCount).padStart(2,"0") + " ／ 封印解除： " + pick);
}));

menuBtn?.addEventListener("click", () => {
  const open = topbar.classList.toggle("menu-open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
qa(".topnav a").forEach(link => link.addEventListener("click", () => {
  topbar.classList.remove("menu-open");
  menuBtn?.setAttribute("aria-expanded","false");
}));
window.addEventListener("scroll", () => topbar.classList.toggle("scrolled", window.scrollY > 18), {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
qa(".section-head,.banner-panel,.hero-card,.mechanic-card,.world-board,.timeline-item,.closing").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});


// Editorial motion: reveal sections with a restrained, accessible entrance.
(() => {
  const targets = document.querySelectorAll(
    ".section-head, .banner-panel, .hero-card, .mechanic-card, .world-board, .timeline-item, .closing-seal"
  );
  targets.forEach((el) => el.setAttribute("data-reveal", ""));
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((el) => el.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  targets.forEach((el) => observer.observe(el));
})();
