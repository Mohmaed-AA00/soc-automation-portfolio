const progress = document.getElementById('scrollProgress');
const glow = document.getElementById('cursorGlow');
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
  progress.style.width = pct + '%';
});
document.addEventListener('mousemove', e => {
  glow.style.opacity = '1';
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => glow.style.opacity = '0');

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal,.reveal-scale').forEach(el => reveal.observe(el));

const terminal = document.getElementById('terminalBody');
const sequence = [
  ['cmd','whoami'],
  ['out','SOC analyst / cybersecurity student'],
  ['cmd','stack'],
  ['out','Wazuh\nSysmon\nShuffle SOAR\nVirusTotal\nTheHive'],
  ['cmd','latest-case'],
  ['out','Suspicious File Creation by PowerShell'],
  ['cmd','verdict'],
  ['out','True Positive // Impact: No // Remediation: None required']
];
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function runTerminal(){
  terminal.innerHTML = '';
  for(const [type,text] of sequence){
    if(type === 'cmd'){
      const line = document.createElement('div');
      line.className = 'term-line';
      terminal.appendChild(line);
      const prefix = '<span class="term-prompt">soc@lab</span><span>:~$ </span>';
      let typed = '';
      for(const ch of text){
        typed += ch;
        line.innerHTML = prefix + typed + '<span class="term-cursor"></span>';
        await sleep(38);
      }
      line.innerHTML = prefix + typed;
      await sleep(180);
    } else {
      const out = document.createElement('div');
      out.className = 'term-line term-out';
      out.textContent = text;
      terminal.appendChild(out);
      await sleep(380);
    }
  }
  await sleep(1700);
  runTerminal();
}
runTerminal();

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('lightboxClose');
document.querySelectorAll('[data-lightbox]').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  });
});
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });
