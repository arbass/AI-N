'use strict'
;(() => {
	var mt = Object.defineProperty,
		ut = Object.defineProperties
	var Et = Object.getOwnPropertyDescriptors
	var H = Object.getOwnPropertySymbols
	var Tt = Object.prototype.hasOwnProperty,
		St = Object.prototype.propertyIsEnumerable
	var K = (t, e, o) =>
			e in t
				? mt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o })
				: (t[e] = o),
		g = (t, e) => {
			for (var o in e || (e = {})) Tt.call(e, o) && K(t, o, e[o])
			if (H) for (var o of H(e)) St.call(e, o) && K(t, o, e[o])
			return t
		},
		C = (t, e) => ut(t, Et(e))
	var A = 'fs-attributes'
	var $ = 'cmsattribute'
	var F = 'cmsload'
	var x = 'socialshare'
	var U = 'support'
	var k = async (...t) => {
		var o
		let e = []
		for (let r of t) {
			let n = await ((o = window.fsAttributes[r]) == null ? void 0 : o.loading)
			e.push(n)
		}
		return e
	}
	var h = () => {}
	function B(t, e, o, r) {
		return t
			? (t.addEventListener(e, o, r), () => t.removeEventListener(e, o, r))
			: h
	}
	var V = {
		wrapper: 'w-dyn-list',
		list: 'w-dyn-items',
		item: 'w-dyn-item',
		paginationWrapper: 'w-pagination-wrapper',
		paginationNext: 'w-pagination-next',
		paginationPrevious: 'w-pagination-previous',
		pageCount: 'w-page-count',
		emptyState: 'w-dyn-empty',
	}
	var W = t => t instanceof Element
	var L = t => typeof t == 'string'
	var N = t => {
		let e = t.split('-'),
			o = parseInt(e[e.length - 1])
		if (!isNaN(o)) return o
	}
	function Y(t, e, o) {
		var n
		let r = window.fsAttributes[t]
		return (r.destroy = o || h), (n = r.resolve) == null || n.call(r, e), e
	}
	var G = (t, e = '1', o = 'iife') => {
		let n = `${t}${o === 'esm' ? '.esm' : ''}.js`
		return `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${t}@${e}/${n}`
	}
	var dt = `${A}-${U}`,
		q = async () => {
			var n
			let { fsAttributes: t, location: e } = window,
				{ host: o, searchParams: r } = new URL(e.href)
			return !o.includes('webflow.io') || !r.has(dt)
				? !1
				: (n = t.import) == null
				? void 0
				: n.call(t, U, '1')
		}
	var p = t => e => `${t}${e ? `-${e}` : ''}`,
		R = t => {
			let e = (n, i, s) => {
				let c = t[n],
					{ key: l, values: w } = c,
					f
				if (!i) return `[${l}]`
				let M = w == null ? void 0 : w[i]
				L(M)
					? (f = M)
					: (f = M(s && 'instanceIndex' in s ? s.instanceIndex : void 0))
				let y = s && 'caseInsensitive' in s && s.caseInsensitive ? 'i' : ''
				if (!(s != null && s.operator)) return `[${l}="${f}"${y}]`
				switch (s.operator) {
					case 'prefixed':
						return `[${l}^="${f}"${y}]`
					case 'suffixed':
						return `[${l}$="${f}"${y}]`
					case 'contains':
						return `[${l}*="${f}"${y}]`
				}
			}
			function o(n, i) {
				let s = e('element', n, i),
					c = (i == null ? void 0 : i.scope) || document
				return i != null && i.all
					? [...c.querySelectorAll(s)]
					: c.querySelector(s)
			}
			return [
				e,
				o,
				(n, i) => {
					let s = t[i]
					return s ? n.getAttribute(s.key) : null
				},
			]
		}
	var I = {
			preventLoad: { key: `${A}-preventload` },
			debugMode: { key: `${A}-debug` },
			src: { key: 'src', values: { finsweet: '@finsweet/attributes' } },
			dev: { key: `${A}-dev` },
		},
		[v, ue] = R(I)
	var j = t => {
		let { currentScript: e } = document,
			o = {}
		if (!e) return { attributes: o, preventsLoad: !1 }
		let n = {
			preventsLoad: L(e.getAttribute(I.preventLoad.key)),
			attributes: o,
		}
		for (let i in t) {
			let s = e.getAttribute(t[i])
			n.attributes[i] = s
		}
		return n
	}
	var X = ({ scriptAttributes: t, attributeKey: e, version: o, init: r }) => {
			var c
			ft(), (c = window.fsAttributes)[e] || (c[e] = {})
			let { preventsLoad: n, attributes: i } = j(t),
				s = window.fsAttributes[e]
			;(s.version = o),
				(s.init = r),
				n ||
					(window.Webflow || (window.Webflow = []),
					window.Webflow.push(() => r(i)))
		},
		ft = () => {
			let t = xt()
			if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
				P(window.fsAttributes, t)
				return
			}
			let e = At(t)
			P(e, t),
				bt(e),
				(window.fsAttributes = e),
				(window.FsAttributes = window.fsAttributes),
				q()
		},
		At = t => {
			let e = {
				cms: {},
				push(...o) {
					var r, n
					for (let [i, s] of o)
						(n = (r = this[i]) == null ? void 0 : r.loading) == null ||
							n.then(s)
				},
				async import(o, r) {
					let n = e[o]
					return (
						n ||
						new Promise(i => {
							let s = document.createElement('script')
							;(s.src = G(o, r)),
								(s.async = !0),
								(s.onload = () => {
									let [c] = P(e, [o])
									i(c)
								}),
								document.head.append(s)
						})
					)
				},
				destroy() {
					var o, r
					for (let n of t)
						(r = (o = window.fsAttributes[n]) == null ? void 0 : o.destroy) ==
							null || r.call(o)
				},
			}
			return e
		},
		xt = () => {
			let t = v('src', 'finsweet', { operator: 'contains' }),
				e = v('dev')
			return [...document.querySelectorAll(`script${t}, script${e}`)].reduce(
				(n, i) => {
					var c
					let s =
						i.getAttribute(I.dev.key) ||
						((c = i.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : c[0])
					return s && !n.includes(s) && n.push(s), n
				},
				[]
			)
		},
		P = (t, e) =>
			e.map(r => {
				let n = t[r]
				return (
					n ||
					((t[r] = {}),
					(n = t[r]),
					(n.loading = new Promise(i => {
						n.resolve = s => {
							i(s), delete n.resolve
						}
					})),
					n)
				)
			}),
		bt = t => {
			let e = Array.isArray(window.fsAttributes) ? window.fsAttributes : []
			t.push(...e)
		}
	var z = '1.3.1'
	var D = `fs-${x}`,
		wt = 'facebook',
		ht = 'twitter',
		It = 'pinterest',
		yt = 'linkedin',
		gt = 'telegram',
		Ct = 'reddit',
		Lt = 'content',
		Rt = 'url',
		Mt = 'facebook-hashtags',
		Ut = 'twitter-hashtags',
		kt = 'twitter-username',
		Bt = 'pinterest-image',
		Nt = 'pinterest-description',
		vt = 'width',
		Pt = 600,
		Dt = 'height',
		Ot = 480,
		u = {
			element: {
				key: `${D}-element`,
				values: {
					facebook: p(wt),
					twitter: p(ht),
					pinterest: p(It),
					linkedin: p(yt),
					telegram: p(gt),
					reddit: p(Ct),
					content: p(Lt),
					url: p(Rt),
					facebookHashtags: p(Mt),
					twitterHashtags: p(Ut),
					twitterUsername: p(kt),
					pinterestImage: p(Bt),
					pinterestDescription: p(Nt),
				},
			},
			width: { key: `${D}-${Dt}`, default: Pt },
			height: { key: `${D}-${vt}`, default: Ot },
		},
		[Q, m] = R(u),
		b = {
			facebook: 'https://www.facebook.com/sharer/sharer.php',
			twitter: 'https://twitter.com/intent/tweet/',
			pinterest: 'https://www.pinterest.com/pin/create/trigger/',
			reddit: 'https://www.reddit.com/submit',
			linkedin: 'https://www.linkedin.com//sharing/share-offsite',
			telegram: 'https://t.me/share',
		}
	var a = {
		facebook: new Map(),
		twitter: new Map(),
		pinterest: new Map(),
		telegram: new Map(),
		linkedin: new Map(),
		reddit: new Map(),
	}
	var Z = () =>
			B(document, 'click', e => {
				let { target: o } = e
				if (!!W(o))
					for (let r in b) {
						let n = r,
							i = o.closest(
								Q('element', n, { operator: 'prefixed', caseInsensitive: !0 })
							)
						if (!i) continue
						let s = a[n].get(i)
						s && Ht(s)
						break
					}
			}),
		Ht = ({ width: t, height: e, shareUrl: o }) => {
			let r = window.innerWidth / 2 - t / 2 + window.screenX,
				n = window.innerHeight / 2 - e / 2 + window.screenY,
				i = `scrollbars=no, width=${t}, height=${e}, top=${n}, left=${r}`,
				s = window.open(o, '', i)
			s && s.focus()
		}
	var Kt = 'fs-cms-element',
		$t = {
			wrapper: 'wrapper',
			list: 'list',
			item: 'item',
			paginationWrapper: 'pagination-wrapper',
			paginationNext: 'pagination-next',
			paginationPrevious: 'pagination-previous',
			pageCount: 'page-count',
			emptyState: 'empty',
		},
		J = t => {
			let e = `.${V[t]}`,
				o = `[${Kt}="${$t[t]}"]`
			return `:is(${e}, ${o})`
		}
	var E = (t, e) => {
		let o = t.getAttribute(e)
		return o ? N(o) : void 0
	}
	function et(t, e, o) {
		let r = T(t, 'facebook', e, o),
			n = m('facebookHashtags', {
				instanceIndex: e,
				operator: 'prefixed',
				scope: o,
			}),
			i = n ? n.textContent : null
		return C(g({}, r), { type: 'facebook', hashtags: i })
	}
	function ot(t, e, o) {
		let r = T(t, 'twitter', e, o),
			n = m('twitterHashtags', {
				instanceIndex: e,
				operator: 'prefixed',
				scope: o,
			}),
			i =
				n && n.textContent
					? n.textContent.replace(/[^a-zA-Z0-9_,]/g, '')
					: null,
			s = m('twitterUsername', {
				instanceIndex: e,
				operator: 'prefixed',
				scope: o,
			}),
			c = s ? s.textContent : null
		return C(g({}, r), { type: 'twitter', hashtags: i, username: c })
	}
	function nt(t, e, o) {
		let r = T(t, 'pinterest', e, o),
			n = m('pinterestImage', {
				instanceIndex: e,
				operator: 'prefixed',
				scope: o,
			}),
			i = n && n.src ? n.src : null,
			s = m('pinterestDescription', {
				instanceIndex: e,
				operator: 'prefixed',
				scope: o,
			}),
			c = s ? s.textContent : null
		return C(g({}, r), { type: 'pinterest', image: i, description: c })
	}
	function T(t, e, o, r) {
		let n = tt(t, u.width.key, u.width.default),
			i = tt(t, u.height.key, u.height.default),
			s = m('content', { instanceIndex: o, operator: 'prefixed', scope: r }),
			c = s ? s.textContent : null,
			l = m('url', { instanceIndex: o, operator: 'prefixed', scope: r }),
			w = l && l.textContent ? l.textContent : window.location.href
		return { content: c, url: w, width: n, height: i, type: e }
	}
	function tt(t, e, o) {
		let r = t.getAttribute(e)
		if (r) {
			let c = parseInt(r)
			return isNaN(c) ? o : c
		}
		let n = t.closest(`[${e}]`)
		if (!n) return o
		let i = n.getAttribute(e)
		if (!i) return o
		let s = parseInt(i)
		return isNaN(s) ? o : s
	}
	function rt({
		type: t,
		url: e,
		hashtags: o,
		content: r,
		width: n,
		height: i,
	}) {
		return _(t, { u: e, hashtag: o, quote: r }, n, i)
	}
	function st({
		type: t,
		content: e,
		username: o,
		hashtags: r,
		url: n,
		width: i,
		height: s,
	}) {
		return _(t, { url: n, hashtags: r, text: e, via: o }, i, s)
	}
	function it({
		type: t,
		url: e,
		image: o,
		description: r,
		width: n,
		height: i,
	}) {
		return _(t, { url: e, description: r, media: o }, n, i)
	}
	function ct({ type: t, url: e, width: o, height: r }) {
		return _(t, { url: e }, o, r)
	}
	function at({ type: t, url: e, content: o, width: r, height: n }) {
		return _(t, { url: e, title: o }, r, n)
	}
	function lt({ type: t, content: e, url: o, width: r, height: n }) {
		return _(t, { url: o, text: e }, r, n)
	}
	function _(t, e, o, r) {
		let n = b[t],
			i = new URL(n),
			s = Object.entries(e)
		for (let [c, l] of s) l && i.searchParams.append(c, l)
		return { height: r, width: o, type: t, shareUrl: i }
	}
	var S = t => t.closest(J('item')) || void 0
	var {
			element: { key: d },
		} = u,
		O = t => {
			for (let e in b) {
				let o = e,
					r = m(o, {
						scope: t,
						operator: 'prefixed',
						all: !0,
						caseInsensitive: !0,
					}),
					n = `${e}[-0-9]*[a-zA-Z]+`,
					i = r.filter(c => {
						var l
						return !(
							(l = c.getAttribute(d)) != null &&
							l.toLocaleLowerCase().match(new RegExp(n))
						)
					}),
					s = Ft[o]
				i.forEach(s)
			}
		},
		Ft = {
			facebook(t) {
				if (a.facebook.has(t)) return
				let e = E(t, d),
					o = S(t),
					r = et(t, e, o),
					n = rt(r)
				a.facebook.set(t, n)
			},
			twitter(t) {
				if (a.twitter.has(t)) return
				let e = E(t, d),
					o = S(t),
					r = ot(t, e, o),
					n = st(r)
				a.twitter.set(t, n)
			},
			pinterest(t) {
				if (a.pinterest.has(t)) return
				let e = E(t, d),
					o = S(t),
					r = nt(t, e, o),
					n = it(r)
				a.pinterest.set(t, n)
			},
			telegram(t) {
				if (a.telegram.has(t)) return
				let e = E(t, d),
					o = S(t),
					r = T(t, 'telegram', e, o),
					n = lt(r)
				a.telegram.set(t, n)
			},
			linkedin(t) {
				if (a.linkedin.has(t)) return
				let e = E(t, d),
					o = S(t),
					r = T(t, 'linkedin', e, o),
					n = ct(r)
				a.linkedin.set(t, n)
			},
			reddit(t) {
				if (a.reddit.has(t)) return
				let e = E(t, d),
					o = S(t),
					r = T(t, 'reddit', e, o),
					n = at(r)
				a.reddit.set(t, n)
			},
		}
	var pt = async () => {
		await k($)
		let t = Z()
		O()
		let e = (await k(F))[0] || []
		for (let { items: o } of e) for (let { element: r } of o) O(r)
		return Y(x, a, () => {
			t()
		})
	}
	X({ init: pt, version: z, attributeKey: x })
})()
