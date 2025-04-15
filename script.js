document.getElementById('surveyForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const game = document.getElementById('game').value;

  const status = document.getElementById('status');
  status.textContent = "送信中…";
  status.style.color = "gray";

  setTimeout(() => {
    console.log("送信内容:", { name, game });
    status.textContent = "送信に成功しました！ご協力ありがとうございました。";
    status.style.color = "green";
    document.getElementById('surveyForm').reset();
  }, 1200); // 送信ディレイ
});
