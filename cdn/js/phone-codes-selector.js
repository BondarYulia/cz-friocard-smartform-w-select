function initPhoneCodes () {
	const countries = getCountries();
	const country = countries.find(x => x.country_code === window.campaign_country_code) || countries[0];
	$('.phone-codes-button-value').text('+' + country.phone_code);
	$('.phone-codes-dropdown').append(
		countries
			.map(x => {
				const country_code = x.country_code.toLowerCase();
				return "\n\t\t\t\t\t<li class=\"phone-codes-dropdown-item\">\n\t\t\t\t\t\t<i id=\""
					.concat(country_code, "\" class=\"phone-codes-dropdown-item-icon flag ")
					.concat(country_code, "\"></i>\n\t\t\t\t\t\t")
					.concat(x.name, "\n\t\t\t\t\t\t<i class=\"phone-codes-dropdown-item-phone-code\">+")
					.concat(x.phone_code, "</i>\n\t\t\t\t\t</li>\n\t\t\t\t");
			})
			.join('\n')
	);

	$('.phone-codes-button').on('click', function (ev) {
		ev.stopPropagation();
		ev.preventDefault();
		const dropdown = $('.phone-codes-dropdown');
		if (dropdown.hasClass('visible')) dropdown.removeClass('visible');
		else dropdown.addClass('visible');
	});
	$('.phone-codes-dropdown-item').on('click', function (ev) {
		ev.stopPropagation();
		ev.preventDefault();
		const phoneCode = $(ev.target).find('.phone-codes-dropdown-item-phone-code').text();
		$('.phone-codes-button-value').text(phoneCode);
		const dropdown = $('.phone-codes-dropdown');
		dropdown.removeClass('visible');
	});
	$(window).click(function () {
		const dropdown = $('.phone-codes-dropdown');
		if (dropdown.hasClass('visible')) dropdown.removeClass('visible');
	});
}

function getCountries() {
	return [
		{
			name: 'Aruba',
			country_code: 'AW',
			phone_code: '297'
		},
		{
			name: 'Afghanistan',
			country_code: 'AF',
			phone_code: '93'
		},
		{
			name: 'Angola',
			country_code: 'AO',
			phone_code: '244'
		},
		{
			name: 'Åland Islands',
			country_code: 'AX',
			phone_code: '358'
		},
		{
			name: 'Albania',
			country_code: 'AL',
			phone_code: '355'
		},
		{
			name: 'Andorra',
			country_code: 'AD',
			phone_code: '376'
		},
		{
			name: 'United Arab Emirates',
			country_code: 'AE',
			phone_code: '971'
		},
		{
			name: 'Argentina',
			country_code: 'AR',
			phone_code: '54'
		},
		{
			name: 'Armenia',
			country_code: 'AM',
			phone_code: '374'
		},
		{
			name: 'Australia',
			country_code: 'AU',
			phone_code: '61'
		},
		{
			name: 'Austria',
			country_code: 'AT',
			phone_code: '43'
		},
		{
			name: 'Azerbaijan',
			country_code: 'AZ',
			phone_code: '994'
		},
		{
			name: 'Burundi',
			country_code: 'BI',
			phone_code: '257'
		},
		{
			name: 'Belgium',
			country_code: 'BE',
			phone_code: '32'
		},
		{
			name: 'Benin',
			country_code: 'BJ',
			phone_code: '229'
		},
		{
			name: 'Burkina Faso',
			country_code: 'BF',
			phone_code: '226'
		},
		{
			name: 'Bangladesh',
			country_code: 'BD',
			phone_code: '880'
		},
		{
			name: 'Bulgaria',
			country_code: 'BG',
			phone_code: '359'
		},
		{
			name: 'Bahrain',
			country_code: 'BH',
			phone_code: '973'
		},
		{
			name: 'Bosnia and Herzegovina',
			country_code: 'BA',
			phone_code: '387'
		},
		{
			name: 'Saint Barthélemy',
			country_code: 'BL',
			phone_code: '590'
		},
		{
			name: 'Belarus',
			country_code: 'BY',
			phone_code: '375'
		},
		{
			name: 'Belize',
			country_code: 'BZ',
			phone_code: '501'
		},
		{
			name: 'Bolivia',
			country_code: 'BO',
			phone_code: '591'
		},
		{
			name: 'Brazil',
			country_code: 'BR',
			phone_code: '55'
		},
		{
			name: 'Brunei',
			country_code: 'BN',
			phone_code: '673'
		},
		{
			name: 'Bhutan',
			country_code: 'BT',
			phone_code: '975'
		},
		{
			name: 'Botswana',
			country_code: 'BW',
			phone_code: '267'
		},
		{
			name: 'Central African Republic',
			country_code: 'CF',
			phone_code: '236'
		},
		{
			name: 'Cocos (Keeling) Islands',
			country_code: 'CC',
			phone_code: '61'
		},
		{
			name: 'Switzerland',
			country_code: 'CH',
			phone_code: '41'
		},
		{
			name: 'Chile',
			country_code: 'CL',
			phone_code: '56'
		},
		{
			name: 'China',
			country_code: 'CN',
			phone_code: '86'
		},
		{
			name: 'Ivory Coast',
			country_code: 'CI',
			phone_code: '225'
		},
		{
			name: 'Cameroon',
			country_code: 'CM',
			phone_code: '237'
		},
		{
			name: 'DR Congo',
			country_code: 'CD',
			phone_code: '243'
		},
		{
			name: 'Republic of the Congo',
			country_code: 'CG',
			phone_code: '242'
		},
		{
			name: 'Cook Islands',
			country_code: 'CK',
			phone_code: '682'
		},
		{
			name: 'Colombia',
			country_code: 'CO',
			phone_code: '57'
		},
		{
			name: 'Comoros',
			country_code: 'KM',
			phone_code: '269'
		},
		{
			name: 'Cape Verde',
			country_code: 'CV',
			phone_code: '238'
		},
		{
			name: 'Costa Rica',
			country_code: 'CR',
			phone_code: '506'
		},
		{
			name: 'Cuba',
			country_code: 'CU',
			phone_code: '53'
		},
		{
			name: 'Christmas Island',
			country_code: 'CX',
			phone_code: '61'
		},
		{
			name: 'Cyprus',
			country_code: 'CY',
			phone_code: '357'
		},
		{
			name: 'Czech Republic',
			country_code: 'CZ',
			phone_code: '420'
		},
		{
			name: 'Germany',
			country_code: 'DE',
			phone_code: '49'
		},
		{
			name: 'Djibouti',
			country_code: 'DJ',
			phone_code: '253'
		},
		{
			name: 'Denmark',
			country_code: 'DK',
			phone_code: '45'
		},
		{
			name: 'Algeria',
			country_code: 'DZ',
			phone_code: '213'
		},
		{
			name: 'Ecuador',
			country_code: 'EC',
			phone_code: '593'
		},
		{
			name: 'Egypt',
			country_code: 'EG',
			phone_code: '20'
		},
		{
			name: 'Eritrea',
			country_code: 'ER',
			phone_code: '291'
		},
		{
			name: 'Western Sahara',
			country_code: 'EH',
			phone_code: '212'
		},
		{
			name: 'Spain',
			country_code: 'ES',
			phone_code: '34'
		},
		{
			name: 'Estonia',
			country_code: 'EE',
			phone_code: '372'
		},
		{
			name: 'Ethiopia',
			country_code: 'ET',
			phone_code: '251'
		},
		{
			name: 'Finland',
			country_code: 'FI',
			phone_code: '358'
		},
		{
			name: 'Fiji',
			country_code: 'FJ',
			phone_code: '679'
		},
		{
			name: 'Falkland Islands',
			country_code: 'FK',
			phone_code: '500'
		},
		{
			name: 'France',
			country_code: 'FR',
			phone_code: '33'
		},
		{
			name: 'Faroe Islands',
			country_code: 'FO',
			phone_code: '298'
		},
		{
			name: 'Micronesia',
			country_code: 'FM',
			phone_code: '691'
		},
		{
			name: 'Gabon',
			country_code: 'GA',
			phone_code: '241'
		},
		{
			name: 'United Kingdom',
			country_code: 'GB',
			phone_code: '44'
		},
		{
			name: 'Georgia',
			country_code: 'GE',
			phone_code: '995'
		},
		{
			name: 'Guernsey',
			country_code: 'GG',
			phone_code: '44'
		},
		{
			name: 'Ghana',
			country_code: 'GH',
			phone_code: '233'
		},
		{
			name: 'Gibraltar',
			country_code: 'GI',
			phone_code: '350'
		},
		{
			name: 'Guinea',
			country_code: 'GN',
			phone_code: '224'
		},
		{
			name: 'Guadeloupe',
			country_code: 'GP',
			phone_code: '590'
		},
		{
			name: 'Gambia',
			country_code: 'GM',
			phone_code: '220'
		},
		{
			name: 'Guinea-Bissau',
			country_code: 'GW',
			phone_code: '245'
		},
		{
			name: 'Equatorial Guinea',
			country_code: 'GQ',
			phone_code: '240'
		},
		{
			name: 'Greece',
			country_code: 'GR',
			phone_code: '30'
		},
		{
			name: 'Greenland',
			country_code: 'GL',
			phone_code: '299'
		},
		{
			name: 'Guatemala',
			country_code: 'GT',
			phone_code: '502'
		},
		{
			name: 'French Guiana',
			country_code: 'GF',
			phone_code: '594'
		},
		{
			name: 'Guyana',
			country_code: 'GY',
			phone_code: '592'
		},
		{
			name: 'Hong Kong',
			country_code: 'HK',
			phone_code: '852'
		},
		{
			name: 'Honduras',
			country_code: 'HN',
			phone_code: '504'
		},
		{
			name: 'Croatia',
			country_code: 'HR',
			phone_code: '385'
		},
		{
			name: 'Haiti',
			country_code: 'HT',
			phone_code: '509'
		},
		{
			name: 'Hungary',
			country_code: 'HU',
			phone_code: '36'
		},
		{
			name: 'Indonesia',
			country_code: 'ID',
			phone_code: '62'
		},
		{
			name: 'Isle of Man',
			country_code: 'IM',
			phone_code: '44'
		},
		{
			name: 'India',
			country_code: 'IN',
			phone_code: '91'
		},
		{
			name: 'British Indian Ocean Territory',
			country_code: 'IO',
			phone_code: '246'
		},
		{
			name: 'Ireland',
			country_code: 'IE',
			phone_code: '353'
		},
		{
			name: 'Iran',
			country_code: 'IR',
			phone_code: '98'
		},
		{
			name: 'Iraq',
			country_code: 'IQ',
			phone_code: '964'
		},
		{
			name: 'Iceland',
			country_code: 'IS',
			phone_code: '354'
		},
		{
			name: 'Israel',
			country_code: 'IL',
			phone_code: '972'
		},
		{
			name: 'Italy',
			country_code: 'IT',
			phone_code: '39'
		},
		{
			name: 'Jersey',
			country_code: 'JE',
			phone_code: '44'
		},
		{
			name: 'Jordan',
			country_code: 'JO',
			phone_code: '962'
		},
		{
			name: 'Japan',
			country_code: 'JP',
			phone_code: '81'
		},
		{
			name: 'Kazakhstan',
			country_code: 'KZ',
			phone_code: '76'
		},
		{
			name: 'Kenya',
			country_code: 'KE',
			phone_code: '254'
		},
		{
			name: 'Kyrgyzstan',
			country_code: 'KG',
			phone_code: '996'
		},
		{
			name: 'Cambodia',
			country_code: 'KH',
			phone_code: '855'
		},
		{
			name: 'Kiribati',
			country_code: 'KI',
			phone_code: '686'
		},
		{
			name: 'South Korea',
			country_code: 'KR',
			phone_code: '82'
		},
		{
			name: 'Kosovo',
			country_code: 'XK',
			phone_code: '383'
		},
		{
			name: 'Kuwait',
			country_code: 'KW',
			phone_code: '965'
		},
		{
			name: 'Laos',
			country_code: 'LA',
			phone_code: '856'
		},
		{
			name: 'Lebanon',
			country_code: 'LB',
			phone_code: '961'
		},
		{
			name: 'Liberia',
			country_code: 'LR',
			phone_code: '231'
		},
		{
			name: 'Libya',
			country_code: 'LY',
			phone_code: '218'
		},
		{
			name: 'Liechtenstein',
			country_code: 'LI',
			phone_code: '423'
		},
		{
			name: 'Sri Lanka',
			country_code: 'LK',
			phone_code: '94'
		},
		{
			name: 'Lesotho',
			country_code: 'LS',
			phone_code: '266'
		},
		{
			name: 'Lithuania',
			country_code: 'LT',
			phone_code: '370'
		},
		{
			name: 'Luxembourg',
			country_code: 'LU',
			phone_code: '352'
		},
		{
			name: 'Latvia',
			country_code: 'LV',
			phone_code: '371'
		},
		{
			name: 'Macau',
			country_code: 'MO',
			phone_code: '853'
		},
		{
			name: 'Saint Martin',
			country_code: 'MF',
			phone_code: '590'
		},
		{
			name: 'Morocco',
			country_code: 'MA',
			phone_code: '212'
		},
		{
			name: 'Monaco',
			country_code: 'MC',
			phone_code: '377'
		},
		{
			name: 'Moldova',
			country_code: 'MD',
			phone_code: '373'
		},
		{
			name: 'Madagascar',
			country_code: 'MG',
			phone_code: '261'
		},
		{
			name: 'Maldives',
			country_code: 'MV',
			phone_code: '960'
		},
		{
			name: 'Mexico',
			country_code: 'MX',
			phone_code: '52'
		},
		{
			name: 'Marshall Islands',
			country_code: 'MH',
			phone_code: '692'
		},
		{
			name: 'Macedonia',
			country_code: 'MK',
			phone_code: '389'
		},
		{
			name: 'Mali',
			country_code: 'ML',
			phone_code: '223'
		},
		{
			name: 'Malta',
			country_code: 'MT',
			phone_code: '356'
		},
		{
			name: 'Myanmar',
			country_code: 'MM',
			phone_code: '95'
		},
		{
			name: 'Montenegro',
			country_code: 'ME',
			phone_code: '382'
		},
		{
			name: 'Mongolia',
			country_code: 'MN',
			phone_code: '976'
		},
		{
			name: 'Mozambique',
			country_code: 'MZ',
			phone_code: '258'
		},
		{
			name: 'Mauritania',
			country_code: 'MR',
			phone_code: '222'
		},
		{
			name: 'Martinique',
			country_code: 'MQ',
			phone_code: '596'
		},
		{
			name: 'Mauritius',
			country_code: 'MU',
			phone_code: '230'
		},
		{
			name: 'Malawi',
			country_code: 'MW',
			phone_code: '265'
		},
		{
			name: 'Malaysia',
			country_code: 'MY',
			phone_code: '60'
		},
		{
			name: 'Mayotte',
			country_code: 'YT',
			phone_code: '262'
		},
		{
			name: 'Namibia',
			country_code: 'NA',
			phone_code: '264'
		},
		{
			name: 'New Caledonia',
			country_code: 'NC',
			phone_code: '687'
		},
		{
			name: 'Niger',
			country_code: 'NE',
			phone_code: '227'
		},
		{
			name: 'Norfolk Island',
			country_code: 'NF',
			phone_code: '672'
		},
		{
			name: 'Nigeria',
			country_code: 'NG',
			phone_code: '234'
		},
		{
			name: 'Nicaragua',
			country_code: 'NI',
			phone_code: '505'
		},
		{
			name: 'Niue',
			country_code: 'NU',
			phone_code: '683'
		},
		{
			name: 'Netherlands',
			country_code: 'NL',
			phone_code: '31'
		},
		{
			name: 'Norway',
			country_code: 'NO',
			phone_code: '47'
		},
		{
			name: 'Nepal',
			country_code: 'NP',
			phone_code: '977'
		},
		{
			name: 'Nauru',
			country_code: 'NR',
			phone_code: '674'
		},
		{
			name: 'New Zealand',
			country_code: 'NZ',
			phone_code: '64'
		},
		{
			name: 'Oman',
			country_code: 'OM',
			phone_code: '968'
		},
		{
			name: 'Pakistan',
			country_code: 'PK',
			phone_code: '92'
		},
		{
			name: 'Panama',
			country_code: 'PA',
			phone_code: '507'
		},
		{
			name: 'Pitcairn Islands',
			country_code: 'PN',
			phone_code: '64'
		},
		{
			name: 'Peru',
			country_code: 'PE',
			phone_code: '51'
		},
		{
			name: 'Philippines',
			country_code: 'PH',
			phone_code: '63'
		},
		{
			name: 'Palau',
			country_code: 'PW',
			phone_code: '680'
		},
		{
			name: 'Papua New Guinea',
			country_code: 'PG',
			phone_code: '675'
		},
		{
			name: 'Poland',
			country_code: 'PL',
			phone_code: '48'
		},
		{
			name: 'North Korea',
			country_code: 'KP',
			phone_code: '850'
		},
		{
			name: 'Portugal',
			country_code: 'PT',
			phone_code: '351'
		},
		{
			name: 'Paraguay',
			country_code: 'PY',
			phone_code: '595'
		},
		{
			name: 'Palestine',
			country_code: 'PS',
			phone_code: '970'
		},
		{
			name: 'French Polynesia',
			country_code: 'PF',
			phone_code: '689'
		},
		{
			name: 'Qatar',
			country_code: 'QA',
			phone_code: '974'
		},
		{
			name: 'Réunion',
			country_code: 'RE',
			phone_code: '262'
		},
		{
			name: 'Romania',
			country_code: 'RO',
			phone_code: '40'
		},
		{
			name: 'Rwanda',
			country_code: 'RW',
			phone_code: '250'
		},
		{
			name: 'Saudi Arabia',
			country_code: 'SA',
			phone_code: '966'
		},
		{
			name: 'Sudan',
			country_code: 'SD',
			phone_code: '249'
		},
		{
			name: 'Senegal',
			country_code: 'SN',
			phone_code: '221'
		},
		{
			name: 'Singapore',
			country_code: 'SG',
			phone_code: '65'
		},
		{
			name: 'South Georgia',
			country_code: 'GS',
			phone_code: '500'
		},
		{
			name: 'Solomon Islands',
			country_code: 'SB',
			phone_code: '677'
		},
		{
			name: 'Sierra Leone',
			country_code: 'SL',
			phone_code: '232'
		},
		{
			name: 'El Salvador',
			country_code: 'SV',
			phone_code: '503'
		},
		{
			name: 'San Marino',
			country_code: 'SM',
			phone_code: '378'
		},
		{
			name: 'Somalia',
			country_code: 'SO',
			phone_code: '252'
		},
		{
			name: 'Saint Pierre and Miquelon',
			country_code: 'PM',
			phone_code: '508'
		},
		{
			name: 'Serbia',
			country_code: 'RS',
			phone_code: '381'
		},
		{
			name: 'South Sudan',
			country_code: 'SS',
			phone_code: '211'
		},
		{
			name: 'São Tomé and Príncipe',
			country_code: 'ST',
			phone_code: '239'
		},
		{
			name: 'Suriname',
			country_code: 'SR',
			phone_code: '597'
		},
		{
			name: 'Slovakia',
			country_code: 'SK',
			phone_code: '421'
		},
		{
			name: 'Slovenia',
			country_code: 'SI',
			phone_code: '386'
		},
		{
			name: 'Sweden',
			country_code: 'SE',
			phone_code: '46'
		},
		{
			name: 'Swaziland',
			country_code: 'SZ',
			phone_code: '268'
		},
		{
			name: 'Seychelles',
			country_code: 'SC',
			phone_code: '248'
		},
		{
			name: 'Syria',
			country_code: 'SY',
			phone_code: '963'
		},
		{
			name: 'Chad',
			country_code: 'TD',
			phone_code: '235'
		},
		{
			name: 'Togo',
			country_code: 'TG',
			phone_code: '228'
		},
		{
			name: 'Thailand',
			country_code: 'TH',
			phone_code: '66'
		},
		{
			name: 'Tajikistan',
			country_code: 'TJ',
			phone_code: '992'
		},
		{
			name: 'Tokelau',
			country_code: 'TK',
			phone_code: '690'
		},
		{
			name: 'Turkmenistan',
			country_code: 'TM',
			phone_code: '993'
		},
		{
			name: 'Timor-Leste',
			country_code: 'TL',
			phone_code: '670'
		},
		{
			name: 'Tonga',
			country_code: 'TO',
			phone_code: '676'
		},
		{
			name: 'Tunisia',
			country_code: 'TN',
			phone_code: '216'
		},
		{
			name: 'Turkey',
			country_code: 'TR',
			phone_code: '90'
		},
		{
			name: 'Tuvalu',
			country_code: 'TV',
			phone_code: '688'
		},
		{
			name: 'Taiwan',
			country_code: 'TW',
			phone_code: '886'
		},
		{
			name: 'Tanzania',
			country_code: 'TZ',
			phone_code: '255'
		},
		{
			name: 'Uganda',
			country_code: 'UG',
			phone_code: '256'
		},
		{
			name: 'Ukraine',
			country_code: 'UA',
			phone_code: '380'
		},
		{
			name: 'Uruguay',
			country_code: 'UY',
			phone_code: '598'
		},
		{
			name: 'Uzbekistan',
			country_code: 'UZ',
			phone_code: '998'
		},
		{
			name: 'Venezuela',
			country_code: 'VE',
			phone_code: '58'
		},
		{
			name: 'Vietnam',
			country_code: 'VN',
			phone_code: '84'
		},
		{
			name: 'Vanuatu',
			country_code: 'VU',
			phone_code: '678'
		},
		{
			name: 'Wallis and Futuna',
			country_code: 'WF',
			phone_code: '681'
		},
		{
			name: 'Samoa',
			country_code: 'WS',
			phone_code: '685'
		},
		{
			name: 'Yemen',
			country_code: 'YE',
			phone_code: '967'
		},
		{
			name: 'South Africa',
			country_code: 'ZA',
			phone_code: '27'
		},
		{
			name: 'Zambia',
			country_code: 'ZM',
			phone_code: '260'
		},
		{
			name: 'Zimbabwe',
			country_code: 'ZW',
			phone_code: '263'
		}
	];
}