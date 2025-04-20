document.addEventListener('DOMContentLoaded', () => {
    // canvas要素を取得
    const canvas = document.getElementById("codeCanvas");
    const ctx = canvas.getContext("2d");

    // キャンバスサイズを設定（幅＝画面幅、高さ＝画面高さ）
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 表示する文字とその設定
    const letters = "01"; // マトリックス風の01コード
    const fontSize = 16;
    let columns = canvas.width / fontSize; // カラム数の計算

    // 各カラムごとのドロップの初期位置（y座標）
    let drops = Array(Math.floor(columns)).fill(1);

    // 描画関数（50msごとに繰り返される）
    function drawMatrixRain() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrixRain, 50);

    // フェードイン表示の監視処理
    const elements = document.querySelectorAll('section, .step, .service-box, .project-box, .target-wrapper, .faq');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));

    // CTAボタンのスムーススクロール
    document.querySelectorAll('.cta button').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelector('.services-section').scrollIntoView({ behavior: 'smooth' });
      });
    });
    // ホバー時の3Dチルトエフェクト
    const tiltElements = document.querySelectorAll('.cta button, .service-box, .project-box, .step');
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', e => {
        const { width, height, left, top } = el.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / width;
        const y = (e.clientY - top - height / 2) / height;

        el.style.transform = `perspective(800px) rotateX(${y * 10}deg) rotateY(${x * -10}deg)`;
        el.style.transition = 'transform 0.1s ease';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
        el.style.transition = 'transform 0.3s ease';
      });
    });
  });