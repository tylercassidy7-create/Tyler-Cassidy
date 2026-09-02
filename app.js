const gamesByWeek = {
  '01': [
    { away:'DAL', awayName:'Cowboys', awayRecord:'0-0', home:'PHI', homeName:'Eagles', homeRecord:'0-0', time:'THU · 8:20 PM', pick:'PHI', probability:'68%', score:'24 — 20', weather:'Clear · 72°', high:true },
    { away:'GB', awayName:'Packers', awayRecord:'0-0', home:'CHI', homeName:'Bears', homeRecord:'0-0', time:'SUN · 1:00 PM', pick:'GB', probability:'87%', score:'27 — 17', weather:'Cloudy · 64°', high:true },
    { away:'NE', awayName:'Patriots', awayRecord:'0-0', home:'BUF', homeName:'Bills', homeRecord:'0-0', time:'SUN · 1:00 PM', pick:'BUF', probability:'74%', score:'28 — 21', weather:'Windy · 58°', high:false },
    { away:'SF', awayName:'49ers', awayRecord:'0-0', home:'SEA', homeName:'Seahawks', homeRecord:'0-0', time:'SUN · 4:05 PM', pick:'SF', probability:'63%', score:'23 — 19', weather:'Rain · 56°', high:false },
    { away:'KC', awayName:'Chiefs', awayRecord:'0-0', home:'LAC', homeName:'Chargers', homeRecord:'0-0', time:'SUN · 4:25 PM', pick:'KC', probability:'59%', score:'31 — 27', weather:'Clear · 76°', high:false },
    { away:'NYJ', awayName:'Jets', awayRecord:'0-0', home:'MIA', homeName:'Dolphins', homeRecord:'0-0', time:'MON · 8:15 PM', pick:'MIA', probability:'61%', score:'26 — 23', weather:'Humid · 81°', high:false },
  ],
  '02': [
    { away:'PHI', awayName:'Eagles', awayRecord:'1-0', home:'NYG', homeName:'Giants', homeRecord:'0-1', time:'SUN · 1:00 PM', pick:'PHI', probability:'76%', score:'29 — 17', weather:'Clear · 70°', high:true },
    { away:'BUF', awayName:'Bills', awayRecord:'1-0', home:'MIA', homeName:'Dolphins', homeRecord:'0-1', time:'SUN · 8:20 PM', pick:'BUF', probability:'54%', score:'27 — 24', weather:'Humid · 82°', high:false },
    { away:'DET', awayName:'Lions', awayRecord:'1-0', home:'GB', homeName:'Packers', homeRecord:'1-0', time:'MON · 8:15 PM', pick:'DET', probability:'57%', score:'26 — 24', weather:'Clear · 61°', high:false },
  ],
  '03': [
    { away:'KC', awayName:'Chiefs', awayRecord:'2-0', home:'BUF', homeName:'Bills', homeRecord:'2-0', time:'SUN · 4:25 PM', pick:'KC', probability:'52%', score:'30 — 28', weather:'Clear · 65°', high:false },
    { away:'SF', awayName:'49ers', awayRecord:'2-0', home:'LAR', homeName:'Rams', homeRecord:'1-1', time:'SUN · 8:20 PM', pick:'SF', probability:'65%', score:'28 — 23', weather:'Clear · 74°', high:true },
  ],
};
const teamColors = { GB:'badge-green', PHI:'badge-navy', BUF:'badge-blue', SF:'badge-red', DAL:'badge-blue', CHI:'badge-navy', NE:'badge-navy', SEA:'badge-navy', KC:'badge-red', LAC:'badge-blue', NYJ:'badge-green', MIA:'badge-blue', NYG:'badge-blue', DET:'badge-blue', LAR:'badge-blue' };
const grid = document.querySelector('#matchupGrid');
const tableBody = document.querySelector('#tableBody');
const weekLabel = document.querySelector('#weekLabel');
const gameCount = document.querySelector('#gameCount');
let activeWeek = '01';
let showingAll = false;

function badge(team) { return `<span class="team-badge ${teamColors[team] || 'badge-navy'}">${team}</span>`; }
function renderGames() {
  const search = document.querySelector('#searchInput').value.trim().toLowerCase();
  const games = (gamesByWeek[activeWeek] || []).filter(game => [game.away, game.home, game.awayName, game.homeName].some(value => value.toLowerCase().includes(search)));
  const visibleGames = showingAll ? games : games.slice(0, 6);
  grid.innerHTML = visibleGames.map(game => `<article class="match-card ${game.high ? 'high-confidence' : ''}">
    <div class="match-meta"><span>${game.time}</span><span class="confidence">${game.probability} confidence</span></div>
    <div class="teams"><div class="team-line">${badge(game.away)}<span class="team-name">${game.awayName}<small class="team-record">${game.awayRecord}</small></span><span class="team-prob ${game.pick === game.away ? 'winner' : ''}">${game.pick === game.away ? game.probability : (100 - parseInt(game.probability)) + '%'}</span></div><div class="team-line">${badge(game.home)}<span class="team-name">${game.homeName}<small class="team-record">${game.homeRecord}</small></span><span class="team-prob ${game.pick === game.home ? 'winner' : ''}">${game.pick === game.home ? game.probability : (100 - parseInt(game.probability)) + '%'}</span></div></div>
    <div class="pick-row"><span>MODEL PICK</span><strong>${game.pick} TO WIN ↗</strong></div><span class="match-weather">${game.weather}</span><span class="match-score">${game.score}</span>
  </article>`).join('');
  tableBody.innerHTML = games.map(game => `<tr><td>${game.away} at ${game.home}</td><td>${game.pick} to win</td><td>${game.probability}</td><td>${game.score}</td><td>${game.time}</td></tr>`).join('');
  gameCount.textContent = visibleGames.length;
  document.querySelector('#loadMore').innerHTML = showingAll ? 'Show fewer games <span>↑</span>' : `Load all week ${activeWeek} games <span>↓</span>`;
  weekLabel.querySelector('span:nth-child(2)').textContent = activeWeek === '01' ? 'THU SEP 10 — MON SEP 14' : `SUN SEP ${17 + (parseInt(activeWeek) - 2) * 7} — MON SEP ${21 + (parseInt(activeWeek) - 2) * 7}`;
}
function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); window.clearTimeout(window.toastTimer); window.toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2300); }
document.querySelectorAll('.week-tab[data-week]').forEach(tab => tab.addEventListener('click', () => { document.querySelectorAll('.week-tab').forEach(item => item.classList.remove('active')); tab.classList.add('active'); activeWeek = tab.dataset.week; showingAll = false; renderGames(); }));
document.querySelector('#searchInput').addEventListener('input', renderGames);
document.querySelector('#loadMore').addEventListener('click', () => { showingAll = !showingAll; renderGames(); });
document.querySelector('#filterButton').addEventListener('click', () => showToast('Filters applied to your slate'));
document.querySelector('[data-scroll="week01"]').addEventListener('click', () => document.querySelector('#forecast').scrollIntoView({ behavior:'smooth' }));
document.querySelectorAll('.view-button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.view-button').forEach(item => item.classList.remove('active')); button.classList.add('active'); const isTable = button.dataset.view === 'table'; grid.classList.toggle('hidden', isTable); document.querySelector('#tableView').classList.toggle('hidden', !isTable); }));
renderGames();
