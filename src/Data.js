import React from 'react';

import Overall from './images/1_overall.png';
import Attack from './images/2_attack.png';
import Defence from './images/3_defence.png';
import Strength from './images/4_strength.png';
import Constitution from './images/5_constitution.png';
import Ranged from './images/6_ranged.png';
import Prayer from './images/7_prayer.png';
import Magic from './images/8_magic.png';
import Cooking from './images/9_cooking.png';
import Woodcutting from './images/10_woodcutting.png';
import Fletching from './images/11_fletching.png';
import Fishing from './images/12_fishing.png';
import Firemaking from './images/13_firemaking.png';
import Crafting from './images/14_crafting.png';
import Smithing from './images/15_smithing.png';
import Mining from './images/16_mining.png';
import Herblore from './images/17_herblore.png';
import Agility from './images/18_agility.png';
import Thieving from './images/19_thieving.png';
import Slayer from './images/20_slayer.png';
import Farming from './images/21_farming.png';
import Runecrafting from './images/22_runecrafting.png';
import Hunter from './images/23_hunter.png';
import Construction from './images/24_construction.png';
import Summoning from './images/25_summoning.png';
import Dungeoneering from './images/26_dungeoneering.png';
import Divination from './images/27_divination.png';
import Invention from './images/28_invention.png';
import Archaeology from './images/29_archaeology.png';

const img_array = [
	Overall,
	Attack,
	Defence,
	Strength,
	Constitution,
	Ranged,
	Prayer,
	Magic,
	Cooking,
	Woodcutting,
	Fletching,
	Fishing,
	Firemaking,
	Crafting,
	Smithing,
	Mining,
	Herblore,
	Agility,
	Thieving,
	Slayer,
	Farming,
	Runecrafting,
	Hunter,
	Construction,
	Summoning,
	Dungeoneering,
	Divination,
	Invention,
	Archaeology,
];

export const skillNameArray = [
	'Overall',
	'Attack',
	'Defence',
	'Strength',
	'Constitution',
	'Ranged',
	'Prayer',
	'Magic',
	'Cooking',
	'Woodcutting',
	'Fletching',
	'Fishing',
	'Firemaking',
	'Crafting',
	'Smithing',
	'Mining',
	'Herblore',
	'Agility',
	'Thieving',
	'Slayer',
	'Farming',
	'Runecrafting',
	'Hunter',
	'Construction',
	'Summoning',
	'Dungeoneering',
	'Divination',
	'Invention',
	'Archaeology',
];

export const skillIcon = (id) => {
	return <img style={{ width: '25px' }} src={img_array[id]} alt="skill icon" />;
};

export const calcVirtualLevel = (rowData) => {
	if (rowData.xp < 14391160 || rowData.name === 'Overall') {
		return rowData.level;
	} else if (rowData.xp >= 104273167) {
		return 120;
	} else if (rowData.xp >= 94442737) {
		return 119;
	} else if (rowData.xp >= 85539082) {
		return 118;
	} else if (rowData.xp >= 77474828) {
		return 117;
	} else if (rowData.xp >= 70170840) {
		return 116;
	} else if (rowData.xp >= 63555443) {
		return 115;
	} else if (rowData.xp >= 57563718) {
		return 114;
	} else if (rowData.xp >= 52136869) {
		return 113;
	} else if (rowData.xp >= 47221641) {
		return 112;
	} else if (rowData.xp >= 42769801) {
		return 111;
	} else if (rowData.xp >= 38737661) {
		return 110;
	} else if (rowData.xp >= 35085654) {
		return 109;
	} else if (rowData.xp >= 31777943) {
		return 108;
	} else if (rowData.xp >= 28782069) {
		return 107;
	} else if (rowData.xp >= 26068632) {
		return 106;
	} else if (rowData.xp >= 23611006) {
		return 105;
	} else if (rowData.xp >= 21385073) {
		return 104;
	} else if (rowData.xp >= 19368992) {
		return 103;
	} else if (rowData.xp >= 17542976) {
		return 102;
	} else if (rowData.xp >= 15889109) {
		return 101;
	} else if (rowData.xp >= 14391160) {
		return 100;
	} else {
		console.log('Error calculating virtual level.');
		return 0;
	}
};

export const rs3_data_array = [
	'Overall',
	'Attack',
	'Defence',
	'Strength',
	'Constitution',
	'Ranged',
	'Prayer',
	'Magic',
	'Cooking',
	'Woodcutting',
	'Fletching',
	'Fishing',
	'Firemaking',
	'Crafting',
	'Smithing',
	'Mining',
	'Herblore',
	'Agility',
	'Thieving',
	'Slayer',
	'Farming',
	'Runecrafting',
	'Hunter',
	'Construction',
	'Summoning',
	'Dungeoneering',
	'Divination',
	'Invention',
	'Archaeology',
	'Bounty Hunter',
	'B.H. Rogues',
	'Dominion Tower',
	'The Crucible',
	'Castle Wars games',
	'B.A. Attackers',
	'B.A. Defenders',
	'B.A. Collectors',
	'B.A. Healers',
	'Duel Tournament',
	'Mobilising Armies',
	'Conquest',
	'Fist of Guthix',
	'GG: Athletics',
	'GG: Resource Race',
	'WE2: Armadyl Lifetime Contribution',
	'WE2: Bandos Lifetime Contribution',
	'WE2: Armadyl PvP kills',
	'WE2: Bandos PvP kills',
	'Heist Guard Level',
	'Heist Robber Level',
	'CFP: 5 game average',
	'AF15: Cow Tipping',
	'AF15: Rats killed after the miniquest',
	'RuneScore',
	'Clue Scrolls Easy',
	'Clue Scrolls Medium',
	'Clue Scrolls Hard',
	'Clue Scrolls Elite',
	'Clue Scrolls Master',
];

export const calcSkillPercentage = (flag, data) => {
	const skillsAt120 = [
		'Invention',
		'Slayer',
		'Dungeoneering',
		'Herblore',
		'Farming',
		'Archaeology',
	];
	var runningTotal = 0;
	switch (flag) {
		case 'max':
			for (const skill in data) {
				const xp = +data[skill].xp;
				if (data[skill].name !== 'Invention') {
					// not invention, add normally
					if (xp >= 13034431) {
						runningTotal += 13034431;
					} else {
						runningTotal += xp;
					}
				} else {
					// use invention xp
					if (xp >= 36073511) {
						runningTotal += 36073511;
					} else {
						runningTotal += xp;
					}
				}
			}
			return {
				remainder: 388003148 - runningTotal,
				percentage: (runningTotal / 388003148) * 100,
			};
		case 'maxtotal':
			for (const skill in data) {
				const xp = +data[skill].xp;
				if (data[skill].name === 'Invention') {
					// use invention xp
					if (xp >= 80618654) {
						runningTotal += 80618654;
					} else {
						runningTotal += xp;
					}
				} else if (skillsAt120.includes(data[skill].name)) {
					// not invention, add normally
					if (xp >= 104273167) {
						runningTotal += 104273167;
					} else {
						runningTotal += xp;
					}
				} else {
					// not invention, add normally
					if (xp >= 13034431) {
						runningTotal += 13034431;
					} else {
						runningTotal += xp;
					}
				}
			}
			return {
				remainder: 888741971 - runningTotal,
				percentage: (runningTotal / 888741971) * 100,
			};
		case '120all':
			for (const skill in data) {
				const xp = +data[skill].xp;
				if (data[skill].name !== 'Invention') {
					// not invention, add normally
					if (xp >= 104273167) {
						runningTotal += 104273167;
					} else {
						runningTotal += xp;
					}
				} else {
					// use invention xp
					if (xp >= 80618654) {
						runningTotal += 80618654;
					} else {
						runningTotal += xp;
					}
				}
			}
			return {
				remainder: 2895994163 - runningTotal,
				percentage: (runningTotal / 2895994163) * 100,
			};
		case 'maxxp':
			runningTotal = data.reduce((a, b) => a + +b.xp, 0);
			return {
				remainder: 5600000000 - runningTotal,
				percentage: (runningTotal / 5600000000) * 100,
			};
		default:
			return 25;
	}
};
