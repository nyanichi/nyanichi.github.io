var base_url = 'https://coba-coba.titikasa.repl.co/';
var cdn_img = 'https://cdn.statically.io/img/';

function kondisi_bglazy() {

	var querys = document.getElementsByClassName('lazy_nyan');
	if (querys.length !== 0) {
		
		for (var i = 0; i < querys.length; i++) {
			var query = querys[i];
			var databg = querys[i].getAttribute('data-bg');
			query.setAttribute('style', 'background-image : url("' + databg + '")');
		}

	}
}
function bglazy() {
	var event = {
		handle : function() {
			kondisi_bglazy();
		}
	}
	window.addEventListener('scroll', event['handle'], false);
	window.addEventListener('touchmove', event['handle'], false);
	window.addEventListener('mousedown', event['handle'], false);

}

function imgAnime(className,x, y) {

	var selector = document.getElementsByClassName(className);

	for (var i = 0; i < selector.length; i++) {
		var width = selector[i].clientWidth;
		var height = width / x * y;
		selector[i].style.height = height + 'px';
	}

	setInterval(function(){

		var selector  = document.getElementsByClassName(className);

		for (var i = 0; i < selector.length; i++) {
			var width = selector[i].clientWidth;
			var height = width / x * y;
			selector[i].style.height = height + 'px';
		}

	},100);
}

function wsajax(json) {

	// mulai ajax
	var ws = new XMLHttpRequest();

	// kondisi
	ws.overrideMimeType("text/plain; charset=x-user-defined");
	ws.addEventListener("loadstart", json['loadstart']);
	ws.addEventListener("load", json['load']);
	ws.addEventListener("progress", json['progress']);
	ws.addEventListener("error", json['error']);
	ws.addEventListener("abort", json['abort']);

	ws.open( json['method'], json['url'], true );

	ws.send();
}

window.addEventListener('load', function() {

	var container = document.querySelector('.container');
	var alert = document.createElement('div');
	var header = document.createElement('div');
	var logo = document.createElement('div');
	var search = document.createElement('div');
	var inputS = document.createElement('input');
	var btnS = document.createElement('button');

	search.appendChild(inputS);
	search.appendChild(btnS);
	header.appendChild(logo);
	header.appendChild(search);
	container.appendChild(header);
	container.appendChild(alert);



	header.setAttribute('class','header_nyan');
	logo.setAttribute('class', 'logo_nyan');
	search.setAttribute('class','search_nyan');
	inputS.setAttribute('type','search');
	inputS.setAttribute('placeholder', 'Search...');
	logo.innerHTML = 'Nyan Project';
	btnS.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><use href="#search"></use></svg>';

	// show alert
	alert.setAttribute('class', 'info_nyan');
	alert.innerHTML = 'cara mencari manga/doujinshi menggunakan Kode Nuklir : <b><i> code#masukkan kode nuklir </i></b> <br /> contoh : code#1234 <br /><br> anda tidak berkewajiban untuk memfollow akun instagram <b>Nyan</b>. jika situs ini tidak aktif/diblokir/dhapus oleh pihak yang berwenang, anda cukup mengunjungi Official account Instagram @nyan.roku untuk mengetahui situs baru <b>Nyan</b>.';

	// var data
	var data = {

		url: base_url,

		method: 'GET',

		loadstart:function() {

			// add Loading
			var loading = document.createElement('div');
			loading.setAttribute('class', 'loading');
			loading.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
			container.appendChild(loading);

		},

		load:function(e) {

			// remove loading
			var loading = document.querySelector('.loading');
			container.removeChild(loading);
			
			// Show Posts
			var a = e['currentTarget']['response'];
			var b = JSON.parse(a);

			/* Popular Post, sering sering cek, suatu saat bakal berubah */
			var popular = b['children'][1]['children'][2]['children'][1]['children'];

			/* New Post */
			var new_post = b['children'][1]['children'][2]['children'][2]['children'];

			// list for popular
			var list = document.createElement('div');
			list.setAttribute('class','list_nyan');

			// list for new posts
			var list2 = document.createElement('div');
			list2.setAttribute('class','list_nyan');

			// show Popular title
			var a = popular[0]['html'];
			var b = document.createElement('h2');
			b.setAttribute('class', 'popular_nyan');
			b.innerHTML = a;
			list.appendChild(b);

			// show New Posts title
			var a = new_post[0]['html'];
			var b = document.createElement('h2');
			b.setAttribute('class', 'new_nyan');
			b.innerHTML = a;
			list2.appendChild(b);

			// show popular content
			for ( var i = 0; i < popular.length; i++ ) {

				if (i > 0) {

					var a = popular[i]['children'][0];

					// var url
					var b = '#' + a['href'].split('/g/')[1].replace('/','');
					// var image
					var c = a['children'][0]['data-src'];
					// var title
					var d = a['children'][2]['html'];

					/* Create Element Popular */
					var link = document.createElement('a');
					var image = document.createElement('div');
					var lazy = document.createElement('div');
					var title = document.createElement('div');

					/* add attribute */
					link.setAttribute('class','link_nyan');
					image.setAttribute('class','image_nyan');
					lazy.setAttribute('class','lazy_nyan');
					title.setAttribute('class','title_nyan');
					link.setAttribute('href', b);
					lazy.setAttribute('data-bg', cdn_img + c.split('https://')[1]);
					title.innerHTML = d;

					/* gabung element */
					image.appendChild(lazy);
					link.appendChild(image);
					link.appendChild(title);
					list.appendChild(link);

				}

			}

			for (var i = 0; i < new_post.length; i++) {

				if (i > 0) {


					var a = new_post[i]['children'][0];

					// var url
					var b = '#' + a['href'].split('/g/')[1].replace('/','');
					// var image
					var c = a['children'][0]['data-src'];
					// var title
					var d = a['children'][2]['html'];

					/* Create Element Popular */
					var link = document.createElement('a');
					var image = document.createElement('div');
					var lazy = document.createElement('div');
					var title = document.createElement('div');

					/* add attribute */
					link.setAttribute('class','link_nyan');
					image.setAttribute('class','image_nyan');
					lazy.setAttribute('class','lazy_nyan');
					title.setAttribute('class','title_nyan');
					link.setAttribute('href', b);
					lazy.setAttribute('data-bg', cdn_img + c.split('https://')[1]);
					title.innerHTML = d;

					/* gabung element */
					image.appendChild(lazy);
					link.appendChild(image);
					link.appendChild(title);
					list2.appendChild(link);

				}

			}

			container.appendChild(list);
			container.appendChild(list2);
			imgAnime('image_nyan', 2, 3);
			bglazy();
		},

		error:function(e) {

			wsajax(data);
		
		}
	};
	wsajax(data);

});
