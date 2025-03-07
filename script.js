document.getElementById("startBtn").addEventListener("click", function() {
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    showQuestion();
});

const virtualQuestions = [
    { question: "你在微信、QQ群里的行为？", category: "EI", labels: ["看消息但不说话", "经常主动发言"], type: "virtual" },
    { question: "你在朋友圈/微博/QQ空间发动态的频率？", category: "EI", labels: ["几乎不发动态", "每天都发，喜欢互动"], type: "virtual" },
    { question: "你在玩多人游戏（如LOL、王者荣耀）时如何交流？", category: "EI", labels: ["更喜欢打字交流", "会开语音聊天"], type: "virtual" },
    { question: "你在B站/知乎/小红书更常看的内容？", category: "SN", labels: ["教程、测评、新闻", "脑洞、科幻、二次元"], type: "virtual" },
    { question: "你玩剧情游戏时更喜欢？", category: "SN", labels: ["按主线任务走，不探索支线", "四处探索，看隐藏剧情"], type: "virtual" },
    { question: "你在游戏/网上遇到新玩法时？", category: "SN", labels: ["先找攻略确保不出错", "自己摸索，不怕试错"], type: "virtual" },
    { question: "你在社交平台上更常做什么？", category: "TF", labels: ["看信息为主，偶尔点赞", "经常留言互动，主动找话题"], type: "virtual" },
    { question: "你在和朋友玩游戏时，通常是什么角色？", category: "TF", labels: ["制定战术、管理资源", "维持团队氛围、安慰队友"], type: "virtual" },
    { question: "你在网上看到别人发了一条有争议的观点时，你更可能？", category: "TF", labels: ["搜索资料，分析对错再回复", "先表达自己的立场和感受"], type: "virtual" },
    { question: "你在游戏或社交媒体的使用习惯？", category: "JP", labels: ["有固定计划，如每天清任务", "随心所欲，想到再玩"], type: "virtual" },
    { question: "你在微信/QQ收到消息后？", category: "JP", labels: ["尽快回复，保持清零", "攒着不回，等有空再说"], type: "virtual" },
    { question: "你在B站/短视频平台的观看方式？", category: "JP", labels: ["按收藏列表观看，控制时间", "随机刷推荐，看上瘾就停不下来"], type: "virtual" }
];

const realQuestions = [
    { question: "在线下社交场合（如聚会、课堂），你的行为是？", category: "EI", labels: ["更喜欢倾听，不主动社交", "主动参与话题，喜欢结识新朋友"], type: "real" },
    { question: "当你走进一个陌生的社交场合时，你通常会？", category: "EI", labels: ["观察环境，等别人来找我", "主动介绍自己，迅速融入"], type: "real" },
    { question: "你在日常生活中喜欢独处还是群体活动？", category: "EI", labels: ["更喜欢自己一个人做事", "喜欢和朋友一起行动"], type: "real" },
    { question: "你更喜欢哪种思考方式？", category: "SN", labels: ["基于经验和事实", "想象可能性，喜欢推测"], type: "real" },
    { question: "你在现实生活中更关注？", category: "SN", labels: ["实际细节和效率", "创造力和未来可能"], type: "real" },
    { question: "你喜欢的工作/学习方式是？", category: "SN", labels: ["按计划执行，关注现实问题", "探索新思路，发掘潜在可能"], type: "real" },
    { question: "当朋友向你倾诉烦恼时，你会？", category: "TF", labels: ["提供实际解决方案", "安慰和共情对方"], type: "real" },
    { question: "你在做决定时更倾向于？", category: "TF", labels: ["理性分析，权衡利弊", "考虑情感因素，顾及他人感受"], type: "real" },
    { question: "你更喜欢哪种沟通方式？", category: "TF", labels: ["简洁直白，注重逻辑", "带有感情色彩，注重表达"], type: "real" },
    { question: "你的日常习惯更偏向？", category: "JP", labels: ["有固定计划，严格执行", "随机应变，随时调整"], type: "real" },
    { question: "面对突发事件时，你的反应是？", category: "JP", labels: ["希望提前规划好，避免意外", "相信自己能应对，灵活适应"], type: "real" },
    { question: "你的时间管理方式更偏向？", category: "JP", labels: ["列清单安排任务", "根据当下的感觉决定"], type: "real" }
];

const allQuestions = [...virtualQuestions, ...realQuestions];
let currentQuestionIndex = 0;
let virtualScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let realScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

function showQuestion() {
    if (currentQuestionIndex >= allQuestions.length) {
        showResult();
        return;
    }

    const questionData = allQuestions[currentQuestionIndex];
    document.getElementById("question").innerText = questionData.question;
    document.getElementById("leftLabel").innerText = questionData.labels[0];
    document.getElementById("rightLabel").innerText = questionData.labels[1];
}

function selectAnswer(value) {
    const questionData = allQuestions[currentQuestionIndex];
    const scoreObj = questionData.type === "virtual" ? virtualScores : realScores;

    scoreObj[questionData.category[0]] += 5 - value;
    scoreObj[questionData.category[1]] += value - 1;

    currentQuestionIndex++;
    showQuestion();
}

function calculateConsistency() {
    let diffE = Math.abs(virtualScores.E - realScores.E);
    let diffS = Math.abs(virtualScores.S - realScores.S);
    let diffT = Math.abs(virtualScores.T - realScores.T);
    let diffJ = Math.abs(virtualScores.J - realScores.J);

    let totalDifference = (diffE + diffS + diffT + diffJ) / 4;
    let consistencyScore = Math.max(0, 100 - totalDifference * 10); // 保证不低于 0

    return consistencyScore.toFixed(1); // 保留 1 位小数
}
function getPersonalityComment(consistency) {
    if (consistency >= 90) {
        return "🎯 <strong>完全一致！</strong> 你的虚拟人格和现实人格几乎一模一样，简直是“线上线下如一”，你的朋友绝对不会在网上认错你！";
    } else if (consistency >= 75) {
        return "😃 <strong>高度相似！</strong> 你的虚拟和现实人格非常接近，只在某些方面略有不同，也许你只是换了个“皮肤”在网上活动！";
    } else if (consistency >= 50) {
        return "🤔 <strong>有些微妙的区别……</strong> 你在虚拟世界可能表现得更大胆/内向/理性/感性，现实中则稍有不同，或许网络让你更放松？";
    } else if (consistency >= 25) {
        return "🤯 <strong>双面人生！</strong> 你的虚拟人格和现实人格有明显不同，你在网上的表现可能会让现实朋友大吃一惊！";
    } else {
        return "🔥 <strong>人格分裂大师！</strong> 你的虚拟人格和现实人格几乎是两个人，甚至可能让朋友怀疑：“这真的是你吗？” 你是如何做到的？！";
    }
}
function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";

    let virtualMBTI = getMBTI(virtualScores);
    let realMBTI = getMBTI(realScores);
    let consistency = calculateConsistency();
    let comment = getPersonalityComment(consistency);
    let mbtiVirtualResults = {
        "ISTJ": ["数据管理员", "你是规则的执行者，擅长优化资源，在虚拟世界里精打细算，管理一切。"],
        "ISFJ": ["守护者NPC", "你是团队的支柱，总是默默支持队友，让团队更加稳定。"],
        "INFJ": ["神秘预言家", "你擅长挖掘游戏剧情和隐藏彩蛋，洞察力超群。"],
        "INTJ": ["幕后策划师", "你像游戏策划一样，总在制定最优策略，制定长期目标。"],
        "ISTP": ["孤独探索者", "你享受独自挑战高难度副本，喜欢解谜、生存类游戏。"],
        "ISFP": ["虚拟艺术家", "你在游戏里精心打造角色外观，热衷个性化表达和创意。"],
        "INFP": ["幻想旅人", "你热爱沉浸式游戏体验，为自己的角色编织故事。"],
        "INTP": ["BUG猎人", "你喜欢拆解游戏机制，寻找隐藏技巧和优化玩法。"],
        "ESTP": ["战场狂徒", "你是PVP高手，享受竞技对抗，战场就是你的舞台。"],
        "ESFP": ["派对发起者", "你是社交达人，组织各种活动，让游戏充满欢乐。"],
        "ENFP": ["虚拟世界冒险家", "你喜欢开放世界游戏，喜欢尝试各种新玩法。"],
        "ENTP": ["挑战极限者", "你热衷极限玩法，如速通、硬核挑战，喜欢突破极限。"],
        "ESTJ": ["公会会长", "你擅长管理团队，组织公会活动，让团队高效运作。"],
        "ESFJ": ["社交领袖", "你热爱社交，喜欢在社群中活跃，帮助新人融入。"],
        "ENFJ": ["游戏导师", "你擅长带新人，愿意分享经验，帮助他人成长。"],
        "ENTJ": ["霸道指挥官", "你擅长战术分析，指挥团队取得胜利。"]
    };

    let mbtiRealResults = {
        "ISTJ": ["严谨执行者", "你是现实生活中的规则拥护者，可靠且注重细节，喜欢有条不紊地完成任务。"],
        "ISFJ": ["温暖守护者", "你总是关心身边的人，愿意默默付出，为朋友和家人提供支持。"],
        "INFJ": ["理想主义者", "你擅长洞察人心，喜欢帮助他人，愿意为世界带来正面的影响。"],
        "INTJ": ["战略规划师", "你总是有长远的计划，喜欢研究并执行最优方案，目标明确且高效。"],
        "ISTP": ["现实中的问题解决者", "你喜欢动手实践，擅长快速分析问题并找到高效的解决方案。"],
        "ISFP": ["感性艺术家", "你在现实中也喜欢表达个性，注重体验和感受，对美感有敏锐的洞察。"],
        "INFP": ["梦想追寻者", "你拥有丰富的内心世界，喜欢探索意义，追求理想主义和创造力。"],
        "INTP": ["思维探索者", "你喜欢推理、分析，擅长独立思考，喜欢深入研究复杂问题。"],
        "ESTP": ["现实行动派", "你充满活力，敢于冒险，善于抓住机会，是现实中的实干家。"],
        "ESFP": ["社交明星", "你喜欢热闹的氛围，擅长活跃气氛，是团队中的开心果。"],
        "ENFP": ["充满热情的探索者", "你天性乐观，喜欢结识新朋友，对生活充满热情，勇于追求梦想。"],
        "ENTP": ["辩论高手", "你喜欢挑战规则，善于提出新观点，喜欢不断创新和思考。"],
        "ESTJ": ["现实中的管理者", "你擅长组织和管理，喜欢制定规则和计划，并高效执行。"],
        "ESFJ": ["热心朋友", "你关心身边的人，愿意维护社交圈的和谐，是朋友圈中的核心人物。"],
        "ENFJ": ["鼓舞者", "你喜欢激励和帮助他人，是团队中的领导者和正能量传播者。"],
        "ENTJ": ["强势领导者", "你充满自信，目标明确，擅长制定策略并带领团队实现目标。"]
    };
    let virtualResultData = mbtiVirtualResults[virtualMBTI];
    let realResultData = mbtiRealResults[realMBTI];
    document.getElementById("mbtiType").innerHTML = `
        <h3>你的虚拟 MBTI 类型是：</h3>
        <strong>${virtualMBTI} - ${virtualResultData[0]}</strong>
        <p>${virtualResultData[1]}</p>
        <h3>你的现实 MBTI 类型是：</h3>
        <strong>${realMBTI} - ${realResultData[0]}</strong>
        <p>${realResultData[1]}</p>
        <h3>你的人格一致性评分：</h3>
        <strong>${consistency}/100</strong>
        <p>${comment}</p>
    `;
}

function getMBTI(scores) {
    return (scores.E > scores.I ? "E" : "I") +
           (scores.S > scores.N ? "S" : "N") +
           (scores.T > scores.F ? "T" : "F") +
           (scores.J > scores.P ? "J" : "P");
}

