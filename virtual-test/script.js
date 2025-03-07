const questions = [
    // **E vs I**
    {
        question: "在社交媒体上，你更喜欢主动分享生活动态还是安静地浏览别人的内容？",
        category: "EI",
        labels: ["只看不发", "经常发帖互动"]
    },
    {
        question: "在游戏或虚拟世界中，你更喜欢独自探索还是与他人组队互动？",
        category: "EI",
        labels: ["单机玩家", "组队党"]
    },
    {
        question: "在虚拟社区（如论坛、群聊）中，你是否积极参与讨论？",
        category: "EI",
        labels: ["从不发言", "经常带动话题"]
    },

    // **S vs N**
    {
        question: "你更喜欢沉浸在现实的细节中，还是畅想未来的可能性？",
        category: "SN",
        labels: ["关注现实", "畅想未来"]
    },
    {
        question: "你在游戏中更喜欢体验设定好的剧情，还是喜欢自由探索和脑补故事？",
        category: "SN",
        labels: ["按主线走", "自由探索"]
    },
    {
        question: "你更喜欢看现实Vlog（如美食、旅游），还是充满创意的视频（如科幻、二次元）？",
        category: "SN",
        labels: ["现实内容", "创意内容"]
    },

    // **T vs F**
    {
        question: "在社交平台上，你更喜欢理性分析问题，还是表达个人感受？",
        category: "TF",
        labels: ["只讲道理", "表达情绪"]
    },
    {
        question: "在虚拟世界中，如果有人需要帮助，你会更倾向于…",
        category: "TF",
        labels: ["先衡量得失", "直接帮助"]
    },
    {
        question: "你更喜欢竞技类游戏，还是感情驱动的剧情游戏？",
        category: "TF",
        labels: ["竞技游戏", "剧情游戏"]
    },

    // **J vs P**
    {
        question: "你在游戏或社交媒体上的行为更有计划性，还是更随意？",
        category: "JP",
        labels: ["按计划进行", "随心所欲"]
    },
    {
        question: "你喜欢提前规划社交活动（如群聊讨论、线下聚会）还是更喜欢临时决定？",
        category: "JP",
        labels: ["提前计划", "说走就走"]
    },
    {
        question: "你在社交媒体上更倾向于整理好内容再发布，还是想到什么就发什么？",
        category: "JP",
        labels: ["精心打磨", "随时发布"]
    }
];

let currentQuestionIndex = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    showQuestion();
});

function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").innerText = questionData.question;
    document.getElementById("leftLabel").innerText = questionData.labels[0];
    document.getElementById("rightLabel").innerText = questionData.labels[1];
}

function selectAnswer(value) {
    const category = questions[currentQuestionIndex].category;
    scores[category[0]] += 6 - value;
    scores[category[1]] += value - 1;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    let mbtiType =
        (scores.E > scores.I ? "E" : "I") +
        (scores.S > scores.N ? "S" : "N") +
        (scores.T > scores.F ? "T" : "F") +
        (scores.J > scores.P ? "J" : "P");

    document.getElementById("mbtiType").innerText = mbtiType;
}
const mbtiResults = {
    "ISTJ": ["数据管理员", "你是规则的执行者，善于管理资源，在虚拟世界中精打细算，优化收益。"],
    "ISFJ": ["守护者NPC", "你总是默默帮助队友，像游戏里的支援角色，团队里不可或缺的温暖存在。"],
    "INFJ": ["神秘预言家", "你擅长挖掘游戏隐藏剧情，总能发现别人忽略的细节，沉浸在世界观设定中。"],
    "INTJ": ["幕后策划师", "你像游戏策划一样，总在制定最优策略，设计长期目标，不打没准备的仗。"],
    "ISTP": ["孤独探索者", "你喜欢一个人挑战高难度任务，擅长解谜、生存，专注于自己的冒险旅程。"],
    "ISFP": ["虚拟艺术家", "你在游戏里精雕细琢角色外观，喜欢拍照、装修房屋，热衷个性化表达。"],
    "INFP": ["幻想旅人", "你在游戏里不仅扮演角色，还会给他们编故事，沉浸于自己的幻想世界。"],
    "INTP": ["BUG猎人", "你喜欢拆解游戏机制，找漏洞、刷隐藏技巧，热衷研究游戏的数学逻辑。"],
    "ESTP": ["战场狂徒", "你热爱竞技，喜欢PVP、排位赛，享受快节奏的刺激对抗，是战场上的传奇。"],
    "ESFP": ["派对发起者", "你喜欢热闹，最擅长带动气氛，组织联机活动，游戏对你来说就是社交场。"],
    "ENFP": ["虚拟世界冒险家", "你热衷于探索开放世界，体验各种玩法，喜欢尝试新鲜事物，永不无聊。"],
    "ENTP": ["挑战极限者", "你总在尝试极端玩法，比如速通、极限挑战，喜欢寻找游戏规则的漏洞。"],
    "ESTJ": ["公会会长", "你擅长管理公会、团队战术，是领导型玩家，让组织井然有序、蒸蒸日上。"],
    "ESFJ": ["社交领袖", "你喜欢维护社区氛围，善于带动讨论，在社交媒体和群聊中是活跃的中心。"],
    "ENFJ": ["游戏导师", "你热衷于教学和分享经验，喜欢带萌新，愿意帮助别人更快适应游戏世界。"],
    "ENTJ": ["霸道指挥官", "你擅长制定战术，在团队作战中充满领导力，是PVP赛场上的统帅。"]
};

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    let mbtiType =
        (scores.E > scores.I ? "E" : "I") +
        (scores.S > scores.N ? "S" : "N") +
        (scores.T > scores.F ? "T" : "F") +
        (scores.J > scores.P ? "J" : "P");

    let resultData = mbtiResults[mbtiType];
    document.getElementById("mbtiType").innerText = `${mbtiType} - ${resultData[0]}`;
    document.getElementById("mbtiDesc").innerText = resultData[1];
}
