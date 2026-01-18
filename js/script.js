async function loadData(){
  try{
    const [pRes, projRes] = await Promise.all([
      fetch('data/profile.json'),
      fetch('data/projects.json')
    ]);
    const profile = await pRes.json();
    const projects = await projRes.json();

    document.getElementById('name').textContent = profile.name;
    document.getElementById('bio').textContent = profile.bio;
    document.getElementById('about').textContent =
      profile.bio + ' Based in ' + (profile.location || '') + '.';

    // avatar
    const avatarEl = document.getElementById('avatar');
    const img = document.createElement('img');
    img.alt = profile.name + ' avatar';
    img.src = `https://github.com/${profile.username}.png`;
    img.onerror = () => { img.onerror = null; img.src = 'data/avatar.svg'; };
    avatarEl.appendChild(img);

    // skills
    const skillsEl = document.getElementById('skills');
    (profile.skills || []).forEach(s => {
      const span = document.createElement('span');
      span.className = 'skill';
      span.textContent = s;
      skillsEl.appendChild(span);
    });

    // badges
    const links = document.getElementById('links');

    const resume = document.createElement('a');
    resume.href = profile.resume;
    resume.target = '_blank';
    resume.innerHTML =
      '<img src="https://img.shields.io/badge/Resume-View-blueviolet?style=for-the-badge">';
    links.appendChild(resume);

    const website = document.createElement('a');
    website.href = profile.website;
    website.target = '_blank';
    website.innerHTML =
      '<img src="https://img.shields.io/badge/Website-Visit-blue?style=for-the-badge">';
    links.appendChild(website);

    // projects
    const projectsEl = document.getElementById('projects');
    projectsEl.innerHTML = '';
    projects.forEach(p => {
      const a = document.createElement('a');
      a.className = 'project';
      a.href = p.url;
      a.target = '_blank';

      const techHtml = (p.tech || [])
        .map(t => `<span class="tech">${t}</span>`)
        .join(' ');

      a.innerHTML = `
        <img src="${p.thumb || 'data/project-1.svg'}"
             onerror="this.src='data/project-1.svg'">
        <div>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div>${techHtml}</div>
        </div>
      `;
      projectsEl.appendChild(a);
    });

    // github stats
    document.getElementById('gh-stats').src =
      `https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=transparent`;

    document.getElementById('gh-toplangs').src =
      `https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&theme=transparent`;

    // theme
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const sw = document.getElementById('theme-switch');

    function applyTheme(t){
      document.documentElement.setAttribute('data-theme', t);
      icon.textContent = t === 'dark' ? '🌙' : '☀️';
      sw.classList.toggle('on', t === 'light');
    }

    const saved = localStorage.getItem('theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(saved);

    toggle.addEventListener('click', () => {
      const next =
        document.documentElement.getAttribute('data-theme') === 'dark'
          ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });

  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadData);
