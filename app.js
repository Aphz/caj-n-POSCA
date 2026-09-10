"use strict";
(function(){

var COLORS=[], LABS=[];

/* ============ catálogo de puntas ============ */
var TIPOS={
  "PC-1MR":  {punta:"Pin extra fina",         ancho:"0.7 mm",       dot:4,  ord:1},
  "PC-3M":   {punta:"Bala fina",              ancho:"0.9 – 1.3 mm", dot:6,  ord:2},
  "PC-5M":   {punta:"Bala media",             ancho:"1.8 – 2.5 mm", dot:9,  ord:3},
  "PC-8K":   {punta:"Cincel jumbo",           ancho:"8 mm",         dot:15, ord:4},
  "PCF-350": {punta:"Pincel flexible",        ancho:"~1 – 10 mm",   dot:12, ord:5},
  "PCM-22":  {punta:"Redonda ancha (Mop'R)",  ancho:"3 – 19 mm",    dot:18, ord:6}
};
function tipInfo(t){ return TIPOS[t]||{punta:"Punta personalizada",ancho:"—",dot:8,ord:99}; }
function allTipos(){ var o=[]; for(var k in TIPOS) o.push(k); o.sort(function(a,b){return TIPOS[a].ord-TIPOS[b].ord;}); return o; }

/* ============ catálogo oficial POSCA por número ============
   Número + nombre de la gama + color de referencia (equivalencia Pantone
   publicada por PoscART, tienda especializada). El número lo trae el
   marcador físico; el color es una aproximación, editable desde el panel. */
var POSCA_CAT={
  "1":{en:"White",es:"Blanco",hex:"#FFFFFF",fam:"estandar"},
  "2":{en:"Yellow",es:"Amarillo",hex:"#FFF102",fam:"estandar"},
  "3":{en:"Bright Yellow",es:"Amarillo Vivo",hex:"#ED972C",fam:"estandar"},
  "4":{en:"Orange",es:"Naranja",hex:"#E6702B",fam:"estandar"},
  "5":{en:"Light Green",es:"Verde Claro",hex:"#85C167",fam:"estandar"},
  "6":{en:"Green",es:"Verde",hex:"#079949",fam:"estandar"},
  "7":{en:"Khaki Green",es:"Verde Caqui",hex:"#434433",fam:"estandar"},
  "8":{en:"Light Blue",es:"Azul Claro",hex:"#5BC3E7",fam:"estandar"},
  "9":{en:"Navy Blue",es:"Azul Marino",hex:"#17344F",fam:"estandar"},
  "10":{en:"Prussian Blue",es:"Azul Prusia",hex:"#323F7C",fam:"estandar"},
  "11":{en:"Fuchsia",es:"Fucsia",hex:"#992265",fam:"estandar"},
  "12":{en:"Violet",es:"Violeta",hex:"#694087",fam:"estandar"},
  "13":{en:"Pink",es:"Rosa",hex:"#E05794",fam:"estandar"},
  "14":{en:"Dark Red",es:"Rojo Oscuro",hex:"#9B2330",fam:"estandar"},
  "15":{en:"Red",es:"Rojo",hex:"#DA2229",fam:"estandar"},
  "17":{en:"Powder Pink",es:"Rosa Polvo",hex:"#EACECB",fam:"estandar"},
  "19":{en:"Ochre",es:"Ocre",hex:"#F5BD30",fam:"estandar"},
  "20":{en:"Chestnut",es:"Castaño",hex:"#BB6449",fam:"estandar"},
  "21":{en:"Brown",es:"Marrón",hex:"#6F4630",fam:"estandar"},
  "22":{en:"Dark Brown",es:"Marrón Oscuro",hex:"#4C2C30",fam:"estandar"},
  "24":{en:"Black",es:"Negro",hex:"#1A1A1A",fam:"estandar"},
  "25":{en:"Gold",es:"Oro",hex:"#A18B44",fam:"metalico"},
  "26":{en:"Silver",es:"Plata",hex:"#BCBEBD",fam:"metalico"},
  "31":{en:"Emerald Green",es:"Verde Esmeralda",hex:"#3CB292",fam:"estandar"},
  "33":{en:"Blue",es:"Azul",hex:"#025094",fam:"estandar"},
  "34":{en:"Lilac",es:"Lila",hex:"#9686B2",fam:"estandar"},
  "37":{en:"Grey",es:"Gris",hex:"#A0A09F",fam:"estandar"},
  "42":{en:"Bronze",es:"Bronce",hex:"#B68566",fam:"metalico"},
  "45":{en:"Beige",es:"Beige",hex:"#D4BE86",fam:"estandar"},
  "46":{en:"Ivory",es:"Marfil",hex:"#EDDF9D",fam:"estandar"},
  "48":{en:"Sky Blue",es:"Azul Cielo",hex:"#6F93C0",fam:"estandar"},
  "51":{en:"Light Pink",es:"Rosa Claro",hex:"#F1BECF",fam:"estandar"},
  "54":{en:"Light Orange",es:"Naranja Pálido",hex:"#EFA25F",fam:"estandar"},
  "56":{en:"Ruby Red",es:"Rojo Rubí",hex:"#A92428",fam:"estandar"},
  "57":{en:"Raspberry",es:"Frambuesa",hex:"#B84775",fam:"estandar"},
  "60":{en:"Red Wine",es:"Rojo Vino",hex:"#6F0932",fam:"estandar"},
  "61":{en:"Slate Grey",es:"Gris Pizarra",hex:"#3C5161",fam:"estandar"},
  "66":{en:"Coral Pink",es:"Rosa Coral",hex:"#FA9D8F",fam:"estandar"},
  "68":{en:"Satin Pink",es:"Rosa Satinado",hex:"#E6B6A2",fam:"estandar"},
  "72":{en:"Apple Green",es:"Verde Manzana",hex:"#71B943",fam:"estandar"},
  "73":{en:"Straw Yellow",es:"Amarillo Paja",hex:"#FFDE7D",fam:"estandar"},
  "82":{en:"Deep Grey",es:"Gris Profundo",hex:"#646465",fam:"estandar"},
  "83":{en:"English Green",es:"Verde Inglés",hex:"#006144",fam:"estandar"},
  "84":{en:"Cacao Brown",es:"Marrón Cacao",hex:"#6A2926",fam:"estandar"},
  "P2":{en:"Sunshine Yellow",es:"Amarillo Sol",hex:"#F7E872",fam:"pastel"},
  "P4":{en:"Apricot",es:"Albaricoque",hex:"#F5BD84",fam:"pastel"},
  "P6":{en:"Aqua Green",es:"Verde Agua",hex:"#73DCD5",fam:"pastel"},
  "P11":{en:"Lavender",es:"Lavanda",hex:"#C181D1",fam:"pastel"},
  "P33":{en:"Glacier Blue",es:"Azul Glaciar",hex:"#69CAF8",fam:"pastel"},
  "M6":{en:"Metallic Green",es:"Verde Metálico",hex:"#58A59A",fam:"metalico"},
  "M12":{en:"Metallic Violet",es:"Violeta Metálico",hex:"#856CA2",fam:"metalico"},
  "M13":{en:"Metallic Pink",es:"Rosa Metálico",hex:"#A66E96",fam:"metalico"},
  "M15":{en:"Metallic Red",es:"Rojo Metálico",hex:"#BF6F58",fam:"metalico"},
  "M33":{en:"Metallic Blue",es:"Azul Metálico",hex:"#5D99AE",fam:"metalico"},
  "F2":{en:"Fluorescent Yellow",es:"Amarillo Flúor",hex:"#FEFF2E",fam:"fluor"},
  "F4":{en:"Fluorescent Orange",es:"Naranja Flúor",hex:"#FF7143",fam:"fluor"},
  "F6":{en:"Fluorescent Green",es:"Verde Flúor",hex:"#03BF6E",fam:"fluor"},
  "F13":{en:"Fluorescent Pink",es:"Rosa Flúor",hex:"#FF3EB5",fam:"fluor"},
  "F15":{en:"Fluorescent Red",es:"Rojo Flúor",hex:"#FF5155",fam:"fluor"},
  "F54":{en:"Fluorescent Light Orange",es:"Naranja Claro Flúor",hex:"#FEFE6E",fam:"fluor"}
};
var POSCA_NAMES=POSCA_CAT;
function pname(code){ return POSCA_CAT[String(code)]||null; }
function catHex(code){ var n=pname(code); return n?n.hex:""; }
function nameEn(mk){ var n=pname(mk.codigo); return n?n.en:(mk.color||""); }
function nameEs(mk){ var n=pname(mk.codigo); return n?n.es:(mk.color||""); }
function labelOf(mk){ return nameEn(mk)||nameEs(mk)||mk.color||"(sin nombre)"; }

var ESTADOS=[{k:"nuevo",label:"Nuevo"},{k:"en_uso",label:"En uso"},{k:"por_acabarse",label:"Por acabarse"},{k:"agotado",label:"Agotado"}];
function estLabel(k){ for(var i=0;i<ESTADOS.length;i++) if(ESTADOS[i].k===k) return ESTADOS[i].label; return "Nuevo"; }
var FAMILIAS=[{k:"estandar",label:"Estándar"},{k:"pastel",label:"Pastel"},{k:"metalico",label:"Metálico"},{k:"glitter",label:"Glitter"},{k:"fluor",label:"Fluor"}];
function famLabel(k){ for(var i=0;i<FAMILIAS.length;i++) if(FAMILIAS[i].k===k) return FAMILIAS[i].label; return "Estándar"; }

/* ============ inventario base (41 unidades) ============ */
var BASE="2026-08-24", NEW1="2026-08-25", NEW2="2026-08-26";
function m(tipo,codigo,hex,o){
  o=o||{};
  return {id:"mk_"+tipo.toLowerCase().replace(/[^a-z0-9]/g,"")+"_"+String(codigo).toLowerCase()+(o.sfx||""),
    tipo:tipo, codigo:String(codigo), color:"", hex:hex.toUpperCase(), familia:o.fam||"estandar",
    cantidad:1, estado:o.est||"nuevo", reponer:!!o.rep, fechaCompra:o.compra||"",
    actualizado:o.compra||BASE, notas:o.nota||""};
}
var SEED_MARKERS=[
  m("PC-1MR","4","#E6702B"), m("PC-1MR","12","#694087"), m("PC-1MR","13","#E05794"),
  m("PC-1MR","24","#1A1A1A"),
  m("PC-1MR","33","#025094",{est:"en_uso",rep:true,nota:"Bastante uso, punta desgastada. Pendiente confirmar si hay repuesto guardado; si no aparece, pasar a «por acabarse»."}),
  m("PC-1MR","P2","#F7E872",{fam:"pastel"}), m("PC-1MR","P6","#73DCD5",{fam:"pastel"}),
  m("PC-3M","1","#FFFFFF"), m("PC-3M","24","#1A1A1A"), m("PC-3M","48","#6F93C0"),
  m("PC-3M","72","#71B943",{est:"por_acabarse",rep:true,nota:"Menos de la mitad del pigmento. Es el marcador más antiguo del set (varios años de uso)."}),
  m("PC-5M","1","#FFFFFF"), m("PC-5M","2","#FFF102"),
  m("PC-5M","3","#ED972C",{compra:NEW2}),
  m("PC-5M","4","#E6702B"), m("PC-5M","6","#079949"), m("PC-5M","8","#5BC3E7"),
  m("PC-5M","12","#694087"), m("PC-5M","13","#E05794"), m("PC-5M","15","#DA2229"),
  m("PC-5M","21","#6F4630"), m("PC-5M","24","#1A1A1A"), m("PC-5M","31","#3CB292"),
  m("PC-5M","34","#9686B2"),
  m("PC-5M","45","#D4BE86",{compra:NEW1}),
  m("PC-5M","46","#EDDF9D"), m("PC-5M","51","#F1BECF"),
  m("PC-5M","54","#EFA25F",{compra:NEW2}),
  m("PC-5M","60","#6F0932"),
  m("PC-5M","61","#3C5161",{compra:NEW1,est:"en_uso",sfx:"_a",nota:"Unidad abierta."}),
  m("PC-5M","61","#3C5161",{compra:NEW1,sfx:"_b",nota:"Sellada, repuesto en bodega (compra duplicada)."}),
  m("PC-5M","66","#FA9D8F"), m("PC-5M","72","#71B943"),
  m("PC-5M","P2","#F7E872",{fam:"pastel"}), m("PC-5M","P4","#F5BD84",{fam:"pastel"}),
  m("PC-5M","P6","#73DCD5",{fam:"pastel"}), m("PC-5M","P11","#C181D1",{fam:"pastel"}),
  m("PC-8K","24","#1A1A1A"), m("PC-8K","54","#EFA25F"),
  m("PCF-350","24","#1A1A1A"),
  m("PCM-22","8","#5BC3E7")
];

/* ============ códigos de barras precargados (SIN VERIFICAR) ============
   Solo los tres en que el color y el EAN venían juntos en el mismo texto de
   origen. Se confirman solos la primera vez que se escanean. */
var SEED_EANS=[
  {ean:"4902778107485", tipo:"PC-5M", codigo:"60", verificado:false, fuente:"rito.com (URL con color y EAN juntos)"},
  {ean:"4902778915912", tipo:"PC-3M", codigo:"1",  verificado:false, fuente:"rito.com (URL con color y EAN juntos)"},
  {ean:"4902778036853", tipo:"PC-5M", codigo:"72", verificado:false, fuente:"anuncio eBay (título con color y EAN juntos)"}
];

/* ===================== motor de color ===================== */
function hex2rgb(h){ h=String(h).replace("#",""); if(h.length===3) h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  return [parseInt(h.substr(0,2),16)/255, parseInt(h.substr(2,2),16)/255, parseInt(h.substr(4,2),16)/255]; }
function cl(v){ return v<0?0:v>1?1:v; }
function rgb2hex(r,g,b){ function p(v){ var n=Math.round(cl(v)*255).toString(16).toUpperCase(); return n.length<2?"0"+n:n; }
  return "#"+p(r)+p(g)+p(b); }
function toLin(c){ return c<=0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4); }
function toSrgb(c){ return c<=0.0031308 ? c*12.92 : 1.055*Math.pow(c,1/2.4)-0.055; }

/* --- HSL --- */
function rgb2hsl(r,g,b){
  var mx=Math.max(r,g,b), mn=Math.min(r,g,b), d=mx-mn, l=(mx+mn)/2, h=0, s=0;
  if(d>1e-9){
    s = l>0.5 ? d/(2-mx-mn) : d/(mx+mn);
    if(mx===r) h=((g-b)/d+(g<b?6:0));
    else if(mx===g) h=((b-r)/d+2);
    else h=((r-g)/d+4);
    h*=60;
  }
  return [(h%360+360)%360, s, l];
}
function hue2rgb(p,q,t){ if(t<0)t+=1; if(t>1)t-=1;
  if(t<1/6) return p+(q-p)*6*t; if(t<1/2) return q; if(t<2/3) return p+(q-p)*(2/3-t)*6; return p; }
function hsl2rgb(h,s,l){
  h=((h%360)+360)%360/360;
  if(s<=1e-9) return [l,l,l];
  var q = l<0.5 ? l*(1+s) : l+s-l*s, p=2*l-q;
  return [hue2rgb(p,q,h+1/3), hue2rgb(p,q,h), hue2rgb(p,q,h-1/3)];
}

/* --- Oklab / OKLCH --- */
function lin2oklab(r,g,b){
  var l=Math.cbrt(0.4122214708*r+0.5363325363*g+0.0514459929*b);
  var m=Math.cbrt(0.2119034982*r+0.6806995451*g+0.1073969566*b);
  var s=Math.cbrt(0.0883024619*r+0.2817188376*g+0.6299787005*b);
  return [0.2104542553*l+0.7936177850*m-0.0040720468*s,
          1.9779984951*l-2.4285922050*m+0.4505937099*s,
          0.0259040371*l+0.7827717662*m-0.8086757660*s];
}
function oklab2lin(L,a,bb){
  var l=L+0.3963377774*a+0.2158037573*bb, m=L-0.1055613458*a-0.0638541728*bb, s=L-0.0894841775*a-1.2914855480*bb;
  l=l*l*l; m=m*m*m; s=s*s*s;
  return [ 4.0767416621*l-3.3077115913*m+0.2309699292*s,
          -1.2684380046*l+2.6097574011*m-0.3413193965*s,
          -0.0041960863*l-0.7034186147*m+1.7076147010*s];
}
var CMAX=0.37;
function hex2oklch(hx){
  var c=hex2rgb(hx), o=lin2oklab(toLin(c[0]),toLin(c[1]),toLin(c[2]));
  var C=Math.sqrt(o[1]*o[1]+o[2]*o[2]);
  var H=C<1e-7?0:(Math.atan2(o[2],o[1])*180/Math.PI+360)%360;
  return [o[0],C,H];
}
function inGamut(lr,lg,lb){ var e=-1e-4, m=1+1e-4; return lr>=e&&lr<=m&&lg>=e&&lg<=m&&lb>=e&&lb<=m; }
function oklch2hex(L,C,H){
  L=cl(L); if(C<0)C=0;
  var rad=H*Math.PI/180, a=Math.cos(rad), b=Math.sin(rad), lo=0, hi=C, lin;
  lin=oklab2lin(L,C*a,C*b);
  if(!inGamut(lin[0],lin[1],lin[2])){
    for(var i=0;i<24;i++){
      var mid=(lo+hi)/2; lin=oklab2lin(L,mid*a,mid*b);
      if(inGamut(lin[0],lin[1],lin[2])) lo=mid; else hi=mid;
    }
    lin=oklab2lin(L,lo*a,lo*b);
  }
  return rgb2hex(toSrgb(cl(lin[0])),toSrgb(cl(lin[1])),toSrgb(cl(lin[2])));
}

/* --- Lab D65 + ΔE2000 --- */
function hex2lab(hx){
  var c=hex2rgb(hx), r=toLin(c[0]), g=toLin(c[1]), b=toLin(c[2]);
  var X=(0.4124564*r+0.3575761*g+0.1804375*b)/0.95047;
  var Y=(0.2126729*r+0.7151522*g+0.0721750*b)/1.00000;
  var Z=(0.0193339*r+0.1191920*g+0.9503041*b)/1.08883;
  function f(t){ return t>0.008856451679 ? Math.cbrt(t) : (903.2962962*t+16)/116; }
  var fx=f(X), fy=f(Y), fz=f(Z);
  return [116*fy-16, 500*(fx-fy), 200*(fy-fz)];
}
function deltaE2000(l1,l2){
  var kL=1,kC=1,kH=1, d2r=Math.PI/180, r2d=180/Math.PI;
  var L1=l1[0],a1=l1[1],b1=l1[2], L2=l2[0],a2=l2[1],b2=l2[2];
  var C1=Math.sqrt(a1*a1+b1*b1), C2=Math.sqrt(a2*a2+b2*b2), Cb=(C1+C2)/2;
  var G=0.5*(1-Math.sqrt(Math.pow(Cb,7)/(Math.pow(Cb,7)+Math.pow(25,7))));
  var ap1=(1+G)*a1, ap2=(1+G)*a2;
  var Cp1=Math.sqrt(ap1*ap1+b1*b1), Cp2=Math.sqrt(ap2*ap2+b2*b2);
  var hp1=(Math.abs(ap1)+Math.abs(b1)===0)?0:((Math.atan2(b1,ap1)*r2d)+360)%360;
  var hp2=(Math.abs(ap2)+Math.abs(b2)===0)?0:((Math.atan2(b2,ap2)*r2d)+360)%360;
  var dLp=L2-L1, dCp=Cp2-Cp1, dhp;
  if(Cp1*Cp2===0) dhp=0;
  else { dhp=hp2-hp1; if(dhp>180) dhp-=360; else if(dhp<-180) dhp+=360; }
  var dHp=2*Math.sqrt(Cp1*Cp2)*Math.sin(dhp/2*d2r);
  var Lbp=(L1+L2)/2, Cbp=(Cp1+Cp2)/2, hbp;
  if(Cp1*Cp2===0) hbp=hp1+hp2;
  else { hbp=hp1+hp2; if(Math.abs(hp1-hp2)>180){ if(hbp<360) hbp+=360; else hbp-=360; } hbp/=2; }
  var T=1-0.17*Math.cos((hbp-30)*d2r)+0.24*Math.cos(2*hbp*d2r)+0.32*Math.cos((3*hbp+6)*d2r)-0.20*Math.cos((4*hbp-63)*d2r);
  var dTh=30*Math.exp(-Math.pow((hbp-275)/25,2));
  var Rc=2*Math.sqrt(Math.pow(Cbp,7)/(Math.pow(Cbp,7)+Math.pow(25,7)));
  var Sl=1+(0.015*Math.pow(Lbp-50,2))/Math.sqrt(20+Math.pow(Lbp-50,2));
  var Sc=1+0.045*Cbp, Sh=1+0.015*Cbp*T, Rt=-Math.sin(2*dTh*d2r)*Rc;
  return Math.sqrt(Math.pow(dLp/(kL*Sl),2)+Math.pow(dCp/(kC*Sc),2)+Math.pow(dHp/(kH*Sh),2)+
    Rt*(dCp/(kC*Sc))*(dHp/(kH*Sh)));
}

/* --- coordenadas según el modo --- */
function coordsOf(hex,mode){
  if(mode==="oklch"){ var o=hex2oklch(hex); return {h:o[2], s:Math.min(1,o[1]/CMAX), l:o[0]}; }
  var c=hex2rgb(hex), t=rgb2hsl(c[0],c[1],c[2]); return {h:t[0], s:t[1], l:t[2]};
}
function hexOf(co,mode){
  if(mode==="oklch") return oklch2hex(co.l, co.s*CMAX, co.h);
  var r=hsl2rgb(co.h,co.s,co.l); return rgb2hex(r[0],r[1],r[2]);
}
function rotate(hex,deg,mode){ var co=coordsOf(hex,mode); co.h=((co.h+deg)%360+360)%360; return hexOf(co,mode); }
function onColor(hex){
  var c=hex2rgb(hex), L=0.2126*toLin(c[0])+0.7152*toLin(c[1])+0.0722*toLin(c[2]);
  return L>0.42 ? "#14171A" : "#FFFFFF";
}

/* nombre descriptivo a partir del color */
var HUENAMES=[[15,"Rojo"],[42,"Naranja"],[56,"Ámbar"],[70,"Amarillo"],[95,"Lima"],[150,"Verde"],
  [170,"Esmeralda"],[190,"Turquesa"],[205,"Cian"],[250,"Azul"],[270,"Índigo"],[292,"Violeta"],[320,"Magenta"],[345,"Rosa"],[361,"Rojo"]];
function colorName(hex){
  var c=hex2rgb(hex), t=rgb2hsl(c[0],c[1],c[2]), h=t[0], s=t[1], l=t[2];
  if(s<0.10) return l>0.85?"Blanco roto":(l<0.15?"Negro":(l>0.55?"Gris claro":"Gris"));
  var base="Rojo";
  for(var i=0;i<HUENAMES.length;i++){ if(h<HUENAMES[i][0]){ base=HUENAMES[i][1]; break; } }
  var q="";
  if(l<0.24) q=" muy oscuro"; else if(l<0.40) q=" oscuro"; else if(l>0.82) q=" muy claro"; else if(l>0.66) q=" claro";
  if(!q && s<0.35) q=" apagado";
  return base+q;
}

/* coincidencia más cercana del inventario */
/* COLORS y LABS se reconstruyen desde el inventario vivo */
function nearest(hex){
  var lab=hex2lab(hex), best=null, bd=Infinity;
  for(var i=0;i<COLORS.length;i++){
    var d=deltaE2000(lab,LABS[i]);
    if(d<bd){ bd=d; best=COLORS[i]; }
  }
  return {color:best, de:bd};
}
var TH_OK=5, TH_MID=15;
function verdictOf(de){ return de<=TH_OK?"ok":(de<=TH_MID?"mid":"no"); }



/* ===================== decodificador EAN-13 / UPC-A =====================
   Sin dependencias externas: lee líneas horizontales de la imagen, las
   binariza, mide las barras y decodifica. Se usa como respaldo cuando el
   navegador no trae BarcodeDetector. */
var EAN_W=[[3,2,1,1],[2,2,2,1],[2,1,2,2],[1,4,1,1],[1,1,3,2],[1,2,3,1],[1,1,1,4],[1,3,1,2],[1,2,1,3],[3,1,1,2]];
var EAN_G=EAN_W.map(function(w){ return w.slice().reverse(); });
var EAN_PARITY=["000000","001011","001101","001110","010011","011001","011100","010101","010110","011010"];

function eanChecksum(digits){
  var s=0;
  for(var i=0;i<12;i++) s += digits[i]*(i%2===0?1:3);
  return (10-(s%10))%10;
}
function eanValid(code){
  if(!/^\d{13}$/.test(code)) return false;
  var d=code.split("").map(Number);
  return eanChecksum(d)===d[12];
}
function normalizeCode(raw){
  var s=String(raw||"").replace(/\D/g,"");
  if(s.length===12) s="0"+s;              /* UPC-A */
  if(s.length===8) return s;              /* EAN-8: se acepta tal cual */
  return s;
}
function matchDigit(widths,unit,onlyL){
  var norm=widths.map(function(w){ return w/unit; });
  var best=-1, bestErr=Infinity, bestSet=null;
  var sets = onlyL ? [["L",EAN_W]] : [["L",EAN_W],["G",EAN_G]];
  sets.forEach(function(pair){
    pair[1].forEach(function(pat,d){
      var err=0;
      for(var i=0;i<4;i++) err += Math.abs(pat[i]-norm[i]);
      if(err<bestErr){ bestErr=err; best=d; bestSet=pair[0]; }
    });
  });
  return bestErr<0.85 ? {d:best,set:bestSet,err:bestErr} : null;
}
function runsFromRow(row,w,adaptive){
  var i, th=new Float32Array(w);
  if(adaptive){
    var win=Math.max(20,Math.round(w/12));
    var pre=new Float64Array(w+1);
    for(i=0;i<w;i++) pre[i+1]=pre[i]+row[i];
    for(i=0;i<w;i++){
      var a=i-win; if(a<0) a=0;
      var b=i+win+1; if(b>w) b=w;
      th[i]=(pre[b]-pre[a])/(b-a)-5;
    }
  } else {
    var mn=255,mx=0;
    for(i=0;i<w;i++){ if(row[i]<mn)mn=row[i]; if(row[i]>mx)mx=row[i]; }
    if(mx-mn<35) return null;
    var g=(mn+mx)/2;
    for(i=0;i<w;i++) th[i]=g;
  }
  /* fronteras con interpolación sub-pixel: tolera bordes suaves y desenfoque */
  var bounds=[], cur=row[0]<th[0], t, v0, v1;
  for(i=1;i<w;i++){
    var d=row[i]<th[i];
    if(d!==cur){
      v0=row[i-1]-th[i-1]; v1=row[i]-th[i];
      t=(v0===v1)?0.5:(v0/(v0-v1));
      if(!(t>=0)) t=0; if(t>1) t=1;
      bounds.push(i-1+t);
      cur=d;
    }
  }
  if(bounds.length<20) return null;
  var runs=[], prev=0, dark=row[0]<th[0];
  for(i=0;i<bounds.length;i++){ runs.push({dark:dark,len:bounds[i]-prev}); prev=bounds[i]; dark=!dark; }
  runs.push({dark:dark,len:w-prev});
  return runs;
}
function decodeRuns(runs){
  for(var s=0;s<runs.length-28;s++){
    if(!runs[s].dark) continue;
    var g=runs[s].len+runs[s+1].len+runs[s+2].len;
    var unit=g/3;
    if(unit<0.8) continue;
    if(Math.abs(runs[s].len-unit)>unit*0.6) continue;
    if(Math.abs(runs[s+1].len-unit)>unit*0.6) continue;
    if(Math.abs(runs[s+2].len-unit)>unit*0.6) continue;
    var i=s+3, left=[], parity="", okRun=true, k, w4, m;
    for(k=0;k<6;k++){
      if(i+3>=runs.length){ okRun=false; break; }
      w4=[runs[i].len,runs[i+1].len,runs[i+2].len,runs[i+3].len];
      m=matchDigit(w4,unit);
      if(!m){ okRun=false; break; }
      left.push(m.d); parity+=(m.set==="L"?"0":"1"); i+=4;
    }
    if(!okRun) continue;
    /* guarda central: 5 runs de 1 módulo */
    if(i+4>=runs.length) continue;
    var mid=true;
    for(k=0;k<5;k++){ if(Math.abs(runs[i+k].len-unit)>unit*0.75){ mid=false; break; } }
    if(!mid) continue;
    i+=5;
    var right=[];
    for(k=0;k<6;k++){
      if(i+3>=runs.length){ okRun=false; break; }
      w4=[runs[i].len,runs[i+1].len,runs[i+2].len,runs[i+3].len];
      m=matchDigit(w4,unit,true);   /* la mitad derecha usa el patrón R: mismos anchos que L */
      if(!m){ okRun=false; break; }
      right.push(m.d); i+=4;
    }
    if(!okRun) continue;
    var first=EAN_PARITY.indexOf(parity);
    if(first<0) continue;
    var digits=[first].concat(left,right);
    if(digits.length!==13) continue;
    if(eanChecksum(digits)!==digits[12]) continue;
    return digits.join("");
  }
  return null;
}
function decodeFromCanvasEl(cv){
  var W=cv.width, H=cv.height, ctx=cv.getContext("2d",{willReadFrequently:true});
  function tryRect(x,y,w,h){
    x=Math.max(0,x|0); y=Math.max(0,y|0); w=Math.min(W-x,w|0); h=Math.min(H-y,h|0);
    if(w<60||h<8) return null;
    var d;
    try{ d=ctx.getImageData(x,y,w,h); }catch(e){ return null; }
    return decodeEANFromImage(d.data,w,h);
  }
  var rects=[[0,0,W,H],
    [0,H*0.22,W,H*0.56],
    [W*0.05,H*0.30,W*0.90,H*0.40],
    [W*0.15,0,W*0.70,H],
    [0,0,W,H*0.52],
    [0,H*0.48,W,H*0.52],
    [W*0.25,H*0.25,W*0.50,H*0.50]];
  for(var i=0;i<rects.length;i++){
    var r=tryRect(rects[i][0],rects[i][1],rects[i][2],rects[i][3]);
    if(r) return r;
  }
  return null;
}
function rotateCanvas(cv,deg){
  var o=document.createElement("canvas");
  o.width=cv.height; o.height=cv.width;
  var x=o.getContext("2d");
  x.translate(o.width/2,o.height/2); x.rotate(deg*Math.PI/180);
  x.drawImage(cv,-cv.width/2,-cv.height/2);
  return o;
}
function scaleCanvas(cv,f){
  var o=document.createElement("canvas");
  o.width=Math.round(cv.width*f); o.height=Math.round(cv.height*f);
  var x=o.getContext("2d");
  x.imageSmoothingEnabled=true;
  if("imageSmoothingQuality" in x) x.imageSmoothingQuality="high";
  x.drawImage(cv,0,0,o.width,o.height);
  return o;
}
function decodeAnyOrientation(cv){
  var r=decodeFromCanvasEl(cv);
  if(r) return r;
  var rot=rotateCanvas(cv,90);
  r=decodeFromCanvasEl(rot);
  if(r) return r;
  /* código pequeño en el encuadre: ampliamos y reintentamos */
  if(cv.width<1500 && cv.height<1500){
    r=decodeFromCanvasEl(scaleCanvas(cv,2));
    if(r) return r;
    r=decodeFromCanvasEl(scaleCanvas(rot,2));
    if(r) return r;
  }
  return null;
}
function decodeCanvasAsync(cv){
  return new Promise(function(res){
    if("BarcodeDetector" in window){
      try{
        var det=new window.BarcodeDetector({formats:["ean_13","upc_a","ean_8"]});
        det.detect(cv).then(function(r){
          if(r&&r.length&&r[0].rawValue) return res(String(r[0].rawValue));
          res(decodeAnyOrientation(cv));
        }).catch(function(){ res(decodeAnyOrientation(cv)); });
        return;
      }catch(e){}
    }
    res(decodeAnyOrientation(cv));
  });
}
function decodeEANFromImage(data,w,h){
  /* líneas repartidas por la altura, con dos binarizaciones y en ambos sentidos */
  var N=Math.min(25,Math.max(9,Math.round(h/8))), lines=[], i;
  for(i=0;i<N;i++) lines.push(Math.floor(h*(0.10+0.80*(i/(N-1)))));
  var row=new Uint8ClampedArray(w), rev=new Uint8ClampedArray(w);
  for(var li=0;li<lines.length;li++){
    var y=Math.min(h-1,lines[li]), off=y*w*4;
    for(i=0;i<w;i++){
      var p=off+i*4;
      row[i]=(data[p]*0.299+data[p+1]*0.587+data[p+2]*0.114)|0;
    }
    for(i=0;i<w;i++) rev[i]=row[w-1-i];
    for(var mode=0;mode<2;mode++){
      var runs=runsFromRow(row,w,mode===0);
      if(runs){ var r=decodeRuns(runs); if(r) return r; }
      var runs2=runsFromRow(rev,w,mode===0);
      if(runs2){ var r2=decodeRuns(runs2); if(r2) return r2; }
    }
  }
  return null;
}


/* ===================== helpers ===================== */
function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function uid(p){ return p+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function today(){ var d=new Date(),p=function(n){return n<10?"0"+n:""+n;}; return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate()); }
var MESES=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
function fmtDate(iso){ if(!iso) return "—"; var p=String(iso).slice(0,10).split("-");
  if(p.length!==3) return String(iso); var mi=parseInt(p[1],10)-1;
  if(isNaN(mi)||mi<0||mi>11) return String(iso); return parseInt(p[2],10)+" "+MESES[mi]+" "+p[0]; }
function byId(i){ return document.getElementById(i); }
function normHex(v){ if(!v) return ""; var s=String(v).trim(); if(s.charAt(0)!=="#") s="#"+s;
  if(/^#[0-9a-fA-F]{3}$/.test(s)) s="#"+s[1]+s[1]+s[2]+s[2]+s[3]+s[3];
  return /^#[0-9a-fA-F]{6}$/.test(s)?s.toUpperCase():""; }
function pref(k,d){ try{ var v=localStorage.getItem("posca."+k); return v==null?d:v; }catch(e){ return d; } }
function setPref(k,v){ try{ localStorage.setItem("posca."+k,v); }catch(e){} }
function sty(hex){ return hex ? 'style="--c:'+esc(hex)+'; --oc:'+onColor(hex)+'"' : 'style="--c:#2A2A31; --oc:#F3F3F1"'; }
function cmpCode(a,b){ var na=parseInt(a,10), nb=parseInt(b,10), pa=/^P/i.test(a), pb=/^P/i.test(b);
  if(pa!==pb) return pa?1:-1;
  if(!isNaN(na)&&!isNaN(nb)&&na!==nb) return na-nb;
  return String(a).localeCompare(String(b),"es",{numeric:true}); }

/* ===================== estado ===================== */
function sanitizeMarker(x){
  var est="nuevo"; for(var i=0;i<ESTADOS.length;i++) if(x&&x.estado===ESTADOS[i].k) est=x.estado;
  var fam="estandar"; for(var j=0;j<FAMILIAS.length;j++) if(x&&x.familia===FAMILIAS[j].k) fam=x.familia;
  var cant=(x&&isFinite(x.cantidad))?Math.max(0,Math.round(Number(x.cantidad))):1;
  if(cant===0) est="agotado";
  return {id:(x&&x.id)?String(x.id):uid("mk"),
    tipo:(x&&typeof x.tipo==="string"&&x.tipo.trim())?x.tipo.trim():"PC-5M",
    codigo:(x&&x.codigo!=null)?String(x.codigo).trim():"",
    color:(x&&x.color!=null)?String(x.color).trim():"",
    hex:normHex(x&&x.hex), familia:fam, cantidad:cant, estado:est, reponer:!!(x&&x.reponer),
    fechaCompra:(x&&x.fechaCompra)?String(x.fechaCompra).slice(0,10):"",
    actualizado:(x&&x.actualizado)?String(x.actualizado).slice(0,10):BASE,
    notas:(x&&x.notas!=null)?String(x.notas):""};
}
function sanitizeSug(x){
  var pr="media"; if(x&&(x.prioridad==="alta"||x.prioridad==="baja")) pr=x.prioridad;
  var st="pendiente"; if(x&&(x.estado==="comprada"||x.estado==="descartada")) st=x.estado;
  return {id:(x&&x.id)?String(x.id):uid("sg"), color:(x&&x.color)?String(x.color):"",
    hex:normHex(x&&x.hex), tipo:(x&&x.tipo)?String(x.tipo):"", prioridad:pr, estado:st,
    motivo:(x&&x.motivo)?String(x.motivo):"", cercano:(x&&x.cercano)?String(x.cercano):"",
    ean:(x&&x.ean)?String(x.ean).replace(/\D/g,""):"",
    fechaAgregada:(x&&x.fechaAgregada)?String(x.fechaAgregada).slice(0,10):today(), origen:(x&&x.origen)?String(x.origen):"rueda"};
}
function sanitizeEan(x){
  return {ean:String((x&&x.ean)||"").replace(/\D/g,""), tipo:String((x&&x.tipo)||""),
    codigo:String((x&&x.codigo)||""), verificado:!!(x&&x.verificado),
    fuente:String((x&&x.fuente)||""), fecha:(x&&x.fecha)?String(x.fecha).slice(0,10):today()};
}
function freshState(){
  return {version:3, markers:SEED_MARKERS.map(sanitizeMarker), suggestions:[],
    eans:SEED_EANS.map(sanitizeEan), actualizado:BASE};
}
var state=freshState();

/* colores del inventario, agrupados por número POSCA */
function rebuildColors(){
  var by={}, out=[];
  state.markers.forEach(function(mk){
    var k=mk.tipo+"|"+mk.codigo;
    void k;
    var c=mk.codigo||("~"+mk.id);
    if(!by[c]){
      var n=pname(c);
      by[c]={code:mk.codigo, hex:mk.hex, en:n?n.en:(mk.color||""), es:n?n.es:(mk.color||""),
        familia:mk.familia, tips:[], units:[]};
      out.push(by[c]);
    }
    if(!by[c].hex && mk.hex) by[c].hex=mk.hex;
    by[c].units.push(mk);
    if(by[c].tips.indexOf(mk.tipo)<0) by[c].tips.push(mk.tipo);
  });
  out=out.filter(function(c){ return !!c.hex; });
  out.forEach(function(c){
    c.tips.sort(function(a,b){ return tipInfo(a).ord-tipInfo(b).ord; });
    c.dup=c.units.length>c.tips.length;
  });
  out.sort(function(a,b){ return cmpCode(a.code,b.code); });
  COLORS=out; LABS=out.map(function(c){ return hex2lab(c.hex); });
}
function tipsOf(c){ return c.tips.join(" · ")+(c.dup?"  (×"+c.units.length+" unidades)":""); }
function labelC(c){ return c.en||c.es||("POSCA "+c.code); }

/* ===================== persistencia local =====================
   La app vive en el dispositivo: IndexedDB como almacén principal y
   localStorage como copia de seguridad síncrona (se escribe también al
   cerrar la página). Nada sale del teléfono salvo que exportes un
   respaldo .json desde «Datos». */
var APP_VERSION="1.0.0";
var DB_NAME="cajon-posca", DB_STORE="kv", DB_KEY="state", LS_KEY="posca.state";
var timer=null, delay=400, dirty=false, storageMode="";
function setChip(s,t){ var c=byId("savechip"); if(!c) return; c.setAttribute("data-s",s); c.querySelector(".txt").textContent=t; }
function idbOpen(){
  return new Promise(function(res,rej){
    if(!window.indexedDB){ rej(new Error("sin IndexedDB")); return; }
    var r; try{ r=indexedDB.open(DB_NAME,1); }catch(e){ rej(e); return; }
    r.onupgradeneeded=function(){ try{ r.result.createObjectStore(DB_STORE); }catch(e){} };
    r.onsuccess=function(){ res(r.result); };
    r.onerror=function(){ rej(r.error||new Error("idb")); };
    r.onblocked=function(){ rej(new Error("idb bloqueada")); };
  });
}
function idbGet(){
  return idbOpen().then(function(db){
    return new Promise(function(res,rej){
      var tx=db.transaction(DB_STORE,"readonly"), q=tx.objectStore(DB_STORE).get(DB_KEY);
      q.onsuccess=function(){ res(q.result==null?null:String(q.result)); db.close(); };
      q.onerror=function(){ rej(q.error); db.close(); };
    });
  });
}
function idbPut(text){
  return idbOpen().then(function(db){
    return new Promise(function(res,rej){
      var tx=db.transaction(DB_STORE,"readwrite");
      tx.objectStore(DB_STORE).put(text,DB_KEY);
      tx.oncomplete=function(){ res(true); db.close(); };
      tx.onerror=function(){ rej(tx.error); db.close(); };
      tx.onabort=function(){ rej(tx.error||new Error("abort")); db.close(); };
    });
  });
}
function lsGet(){ try{ return localStorage.getItem(LS_KEY); }catch(e){ return null; } }
function lsPut(text){ try{ localStorage.setItem(LS_KEY,text); return true; }catch(e){ return false; } }
function parseState(raw){
  if(!raw) return null;
  try{
    var o=JSON.parse(raw);
    if(!o||!(o.markers instanceof Array)) return null;
    return {version:3, markers:o.markers.map(sanitizeMarker),
      suggestions:(o.suggestions instanceof Array)?o.suggestions.map(sanitizeSug):[],
      eans:(o.eans instanceof Array)?o.eans.map(sanitizeEan).filter(function(e){return e.ean;}):[],
      actualizado:o.actualizado||today()};
  }catch(e){ console.warn("Estado ilegible.",e); return null; }
}
function embeddedState(){ var n=byId("posca-state"); return parseState(n?n.textContent.trim():""); }
/* orden de carga: IndexedDB → localStorage → JSON embebido en la página → inventario base */
function loadLocal(){
  return idbGet().then(function(t){ var s=parseState(t); if(s){ storageMode="idb"; return s; }
    var l=parseState(lsGet()); if(l){ storageMode="ls"; return l; } return null; })
  .catch(function(){ var l=parseState(lsGet()); if(l){ storageMode="ls"; return l; } return null; })
  .then(function(s){ if(s) return s; s=embeddedState(); storageMode=storageMode||"seed"; return s||freshState(); });
}
function serialize(){ return JSON.stringify(state); }
function queueSave(){
  state.actualizado=today(); dirty=true;
  setChip("saving","Guardando");
  if(timer) clearTimeout(timer);
  timer=setTimeout(doSave,delay);
}
function doSave(){
  timer=null;
  var text; try{ text=serialize(); }catch(e){ console.error(e); setChip("error","Sin guardar"); return; }
  var okLS=lsPut(text);
  idbPut(text).then(function(){ dirty=false; setChip("saved","Guardado"); })
  .catch(function(err){ console.warn("IndexedDB falló; queda la copia en localStorage.",err);
    if(okLS){ dirty=false; setChip("saved","Guardado"); } else setChip("error","Sin guardar"); });
}
function flushSave(){ if(!dirty) return; if(timer){ clearTimeout(timer); timer=null; } try{ lsPut(serialize()); }catch(e){} }
function touch(mk){ mk.actualizado=today(); }

/* ===================== ui ===================== */
function sheetFromUrl(){ try{ var s=new URLSearchParams(location.search).get("sheet");
  return (s==="cajon"||s==="rueda"||s==="escaner"||s==="compras")?s:""; }catch(e){ return ""; } }
var ui={
  sheet: sheetFromUrl()||pref("sheet","cajon"),
  q:"", scanq:"", tipos:{}, estados:{}, soloRep:false,
  mode: pref("mode","hsl")==="oklch"?"oklch":"hsl",
  sep: Math.min(90,Math.max(5,parseInt(pref("sep","30"),10)||30)),
  dots: pref("dots","1")==="1",
  layer: pref("layer","0")==="1",
  co:null, modal:null, readOnly:false,
  data:{open:false,msg:"",pending:null,confirm:"",showRaw:false},
  scan:{active:false, code:"", msg:"", err:"", linking:false, lastOk:""}
};
function keysOf(o){ var r=[]; for(var k in o) if(o[k]) r.push(k); return r; }
function baseHex(){ return hexOf(ui.co,ui.mode); }

/* ===================== consultas ===================== */
function findMk(id){ for(var i=0;i<state.markers.length;i++) if(state.markers[i].id===id) return state.markers[i]; return null; }
function findSug(id){ for(var i=0;i<state.suggestions.length;i++) if(state.suggestions[i].id===id) return state.suggestions[i]; return null; }
function findEan(code){ for(var i=0;i<state.eans.length;i++) if(state.eans[i].ean===code) return state.eans[i]; return null; }
function skuMarkers(tipo,codigo){ return state.markers.filter(function(m){ return m.tipo===tipo && m.codigo===codigo; }); }
function countBy(fn){ var n=0; state.markers.forEach(function(m){ if(fn(m)) n++; }); return n; }
function tiposPresentes(){ var s={},o=[]; state.markers.forEach(function(m){ if(!s[m.tipo]){s[m.tipo]=1;o.push(m.tipo);} });
  o.sort(function(a,b){ return tipInfo(a).ord-tipInfo(b).ord; }); return o; }
function sortInv(list){
  return list.slice().sort(function(a,b){
    return (tipInfo(a.tipo).ord-tipInfo(b.tipo).ord) || cmpCode(a.codigo,b.codigo) || a.id.localeCompare(b.id);
  });
}
function filteredInv(){
  var q=ui.q.trim().toLowerCase(), ft=keysOf(ui.tipos), fe=keysOf(ui.estados);
  return state.markers.filter(function(m){
    if(ft.length&&ft.indexOf(m.tipo)<0) return false;
    if(fe.length&&fe.indexOf(m.estado)<0) return false;
    if(ui.soloRep&&!(m.reponer||m.estado==="por_acabarse"||m.estado==="agotado")) return false;
    if(q){
      var eans=state.eans.filter(function(e){return e.tipo===m.tipo&&e.codigo===m.codigo;}).map(function(e){return e.ean;}).join(" ");
      var hay=(m.codigo+" "+nameEn(m)+" "+nameEs(m)+" "+m.color+" "+m.tipo+" "+m.notas+" "+eans).toLowerCase();
      if(hay.indexOf(q)<0) return false;
    }
    return true;
  });
}
function skuList(){
  var seen={}, out=[];
  state.markers.forEach(function(m){
    var k=m.tipo+"|"+m.codigo;
    if(!seen[k]){ seen[k]=true; out.push({tipo:m.tipo,codigo:m.codigo,hex:m.hex,mk:m}); }
  });
  out.sort(function(a,b){ return (tipInfo(a.tipo).ord-tipInfo(b.tipo).ord)||cmpCode(a.codigo,b.codigo); });
  return out;
}

/* ===================== piezas ===================== */
function tipBadge(t){ var i=tipInfo(t), d=Math.min(i.dot,13);
  return '<span class="tipbadge" title="'+esc(i.punta+" · "+i.ancho)+'"><i style="width:'+d+'px;height:'+d+'px"></i>'+esc(t)+'</span>'; }
function estadoSelect(mk){
  var o=ESTADOS.map(function(e){ return '<option value="'+e.k+'"'+(mk.estado===e.k?" selected":"")+'>'+esc(e.label)+'</option>'; }).join("");
  return '<select class="pill e-'+mk.estado+'" data-act="estado" data-id="'+esc(mk.id)+'" aria-label="Estado">'+o+'</select>';
}
function invCard(mk){
  var eans=state.eans.filter(function(e){ return e.tipo===mk.tipo&&e.codigo===mk.codigo; });
  return '<article class="iv'+(mk.estado==="agotado"?" gone":"")+'">'+
    '<div class="slab" '+sty(mk.hex)+'>'+
      (mk.familia!=="estandar"?'<span class="fam">'+esc(famLabel(mk.familia))+'</span>':'')+
      (mk.reponer?'<span class="flag">Reponer</span>':'')+
      '<span class="n">'+esc(mk.codigo||"—")+'</span>'+
    '</div>'+
    '<div class="body">'+
      '<div class="nm">'+esc(nameEn(mk)||mk.color||"(sin nombre)")+'</div>'+
      '<div class="al">'+esc(nameEs(mk))+'</div>'+
      '<div class="crow" style="gap:6px;flex-wrap:wrap">'+tipBadge(mk.tipo)+estadoSelect(mk)+'</div>'+
      '<div class="mt">'+(mk.fechaCompra?"Comprado "+esc(fmtDate(mk.fechaCompra)):"Act. "+esc(fmtDate(mk.actualizado)))+
        (eans.length?' · '+esc(eans[0].ean)+(eans[0].verificado?"":" ?"):"")+'</div>'+
      '<div class="foot">'+
        '<div class="qty"><button type="button" data-act="dec" data-id="'+esc(mk.id)+'" aria-label="Restar">−</button>'+
        '<span>'+mk.cantidad+'</span>'+
        '<button type="button" data-act="inc" data-id="'+esc(mk.id)+'" aria-label="Sumar">+</button></div>'+
        '<button type="button" class="tiny" data-act="rep" data-id="'+esc(mk.id)+'" aria-pressed="'+(mk.reponer?"true":"false")+'">Reponer</button>'+
        '<button type="button" class="tiny" data-act="towheel" data-hex="'+esc(mk.hex)+'" title="Usar este color como base en la rueda">Rueda</button>'+
        '<button type="button" class="tiny" data-act="edit" data-id="'+esc(mk.id)+'">Editar</button>'+
      '</div>'+
    '</div></article>';
}
function emptyBox(t,p,btn){ return '<div class="empty"><b>'+esc(t)+'</b><p>'+esc(p)+'</p>'+(btn||"")+'</div>'; }

/* ===================== lámina: cajón ===================== */
function sheetCajon(){
  return '<div class="stats" id="stats"></div>'+
    '<div class="filters">'+
      '<label class="search"><span class="lbl" aria-hidden="true">Buscar</span>'+
      '<input type="search" id="q" placeholder="Número, nombre, nota o código de barras…" aria-label="Buscar en el cajón"></label>'+
      '<button type="button" class="big alt" data-act="add">Agregar marcador</button>'+
    '</div>'+
    '<div class="filters"><div class="chips" id="chips-tipo"></div></div>'+
    '<div class="filters"><div class="chips" id="chips-estado"></div></div>'+
    '<div class="rescount" id="rescount"></div>'+
    '<div id="invresults"></div>';
}
function paintStats(){
  var el=byId("stats"); if(!el) return;
  var un=0, cols={};
  state.markers.forEach(function(m){ un+=m.cantidad; if(m.codigo) cols[m.codigo]=1; });
  var s=[["Unidades",un,""],["Números",Object.keys(cols).length,""],["Puntas",tiposPresentes().length,""],
    ["Por acabarse",countBy(function(m){return m.estado==="por_acabarse";}),"warn"],
    ["Agotados",countBy(function(m){return m.estado==="agotado";}),"bad"],
    ["Reponer",countBy(function(m){return m.reponer;}),""],
    ["Códigos EAN",state.eans.length,""]];
  el.innerHTML=s.map(function(r){ return '<div class="st'+(r[2]&&r[1]>0?" "+r[2]:"")+'"><b>'+r[1]+'</b><span>'+esc(r[0])+'</span></div>'; }).join("");
}
function paintChips(){
  var ct=byId("chips-tipo"), ce=byId("chips-estado"); if(!ct||!ce) return;
  ct.innerHTML=tiposPresentes().map(function(t){
    var n=countBy(function(m){return m.tipo===t;}), d=Math.min(tipInfo(t).dot,11);
    return '<button type="button" class="chip" data-act="ftipo" data-k="'+esc(t)+'" aria-pressed="'+(ui.tipos[t]?"true":"false")+'" title="'+esc(tipInfo(t).punta)+'">'+
      '<i style="width:'+d+'px;height:'+d+'px"></i>'+esc(t)+'<span class="n">'+n+'</span></button>';
  }).join("");
  ce.innerHTML=ESTADOS.map(function(e){
    var n=countBy(function(m){return m.estado===e.k;});
    return '<button type="button" class="chip" data-act="festado" data-k="'+e.k+'" aria-pressed="'+(ui.estados[e.k]?"true":"false")+'">'+
      esc(e.label)+'<span class="n">'+n+'</span></button>';
  }).join("")+'<button type="button" class="chip" data-act="solorep" aria-pressed="'+(ui.soloRep?"true":"false")+'">Solo reposición</button>';
}
function paintInv(){
  var list=sortInv(filteredInv()), el=byId("invresults"); if(!el) return;
  var act=keysOf(ui.tipos).length+keysOf(ui.estados).length+(ui.soloRep?1:0)+(ui.q.trim()?1:0);
  byId("rescount").innerHTML='<span>'+list.length+' de '+state.markers.length+' unidades</span>'+
    (act?'<button type="button" class="tiny" data-act="clearf">Limpiar filtros</button>':'');
  if(!state.markers.length){
    el.innerHTML=emptyBox("El cajón está vacío","Agrega el primer marcador y aparecerá aquí con su número, su nombre POSCA y su estado.",
      '<button type="button" class="big" style="margin-top:14px" data-act="add">Agregar marcador</button>'); return; }
  if(!list.length){ el.innerHTML=emptyBox("Ninguna unidad coincide","Prueba con otro término o quita algún filtro.",
      '<button type="button" class="big alt" style="margin-top:14px" data-act="clearf">Limpiar filtros</button>'); return; }
  var html="", cur=null;
  list.forEach(function(mk){
    if(mk.tipo!==cur){
      if(cur!==null) html+='</div>';
      cur=mk.tipo;
      var i=tipInfo(cur), n=list.filter(function(x){return x.tipo===cur;}).length;
      html+='<div class="blk" style="margin-top:18px"><div class="blkhead"><h2>'+esc(cur)+'</h2>'+
        '<span class="h">'+esc(i.punta)+' · '+esc(i.ancho)+' · '+n+(n===1?" unidad":" unidades")+'</span></div><div class="invgrid">';
    }
    html+=invCard(mk);
  });
  if(cur!==null) html+='</div></div>';
  el.innerHTML=html;
}

/* ===================== lámina: compras ===================== */
function sheetCompras(){ return '<div id="compras"></div>'; }
function paintCompras(){
  var el=byId("compras"); if(!el) return;
  var bajo=sortInv(state.markers.filter(function(m){return m.estado==="por_acabarse";}));
  var out=sortInv(state.markers.filter(function(m){return m.estado==="agotado";}));
  var rep=sortInv(state.markers.filter(function(m){return m.reponer&&m.estado!=="por_acabarse"&&m.estado!=="agotado";}));
  var sug=state.suggestions.filter(function(s){return s.estado==="pendiente";});
  function sec(t,h,l){ return l.length?'<div class="blk"><div class="blkhead"><h2>'+esc(t)+'</h2><span class="h">'+esc(h)+'</span></div>'+
    '<div class="invgrid">'+l.map(invCard).join("")+'</div></div>':""; }
  var html=sec("Por acabarse","Queda poco pigmento.",bajo)+
    sec("Agotados","Sin tinta o sin unidades; siguen listados para que no se te olviden.",out)+
    sec("En lista de compra","Marcados por ti, aunque todavía escriban bien.",rep);
  html+='<div class="blk"><div class="blkhead"><h2>Colores que no tienes</h2>'+
    '<span class="h">Anotados desde la rueda o desde un código escaneado que no reconociste.</span></div>'+
    (sug.length
      ? '<div class="buy">'+sug.map(function(s){
          return '<div class="buyrow" '+sty(s.hex)+'><span class="sl3"></span>'+
            '<span class="g"><b>'+esc(s.color||"(sin nombre)")+'</b>'+
            '<span>'+esc(s.hex||"")+(s.ean?' · EAN '+esc(s.ean):"")+' · '+esc(s.motivo)+'</span>'+
            (s.cercano?'<span>Lo más cercano que tienes: '+esc(s.cercano)+'</span>':'')+'</span>'+
            '<button type="button" class="tiny" data-act="sug-buy" data-id="'+esc(s.id)+'">Ya lo compré</button>'+
            '<button type="button" class="tiny" data-act="sug-del" data-id="'+esc(s.id)+'">Quitar</button></div>';
        }).join("")+'</div>'
      : emptyBox("Nada anotado","Desde la rueda, «Anotar para comprar» guarda acá los colores que te faltan; el escáner hace lo mismo con un código que no reconozcas."));
  if(!bajo.length&&!out.length&&!rep.length&&!sug.length)
    html=emptyBox("Nada pendiente","Ningún marcador está por acabarse ni agotado, y no hay nada anotado para comprar.");
  el.innerHTML=html;
}

/* ===================== lámina: rueda ===================== */
function identify(hex){ var n=nearest(hex);
  return {color:n.color, de:n.de, exact:n.de<0.75, verdict:verdictOf(n.de)}; }
function harmony(){
  var b=baseHex(), s=ui.sep;
  return [["Base",0],["Antagonista",180],["Análogo −"+s+"°",-s],["Análogo +"+s+"°",s]].map(function(d){
    var hex=d[1]===0?b:rotate(b,d[1],ui.mode);
    return {role:d[0], deg:d[1], hex:hex, hue:coordsOf(hex,ui.mode).h, id:identify(hex)};
  });
}
function suggested(hex){ hex=String(hex).toUpperCase();
  for(var i=0;i<state.suggestions.length;i++) if(state.suggestions[i].hex===hex) return state.suggestions[i];
  return null; }
var cvs=null, ctx=null, offc=null;
function fastOklchRgb(L,C,H){
  var rad=H*Math.PI/180, ca=Math.cos(rad), sa=Math.sin(rad), lin=oklab2lin(L,C*ca,C*sa);
  if(!inGamut(lin[0],lin[1],lin[2])){
    var lo=0,hi=C;
    for(var i=0;i<8;i++){ var mid=(lo+hi)/2, t=oklab2lin(L,mid*ca,mid*sa);
      if(inGamut(t[0],t[1],t[2])) lo=mid; else hi=mid; }
    lin=oklab2lin(L,lo*ca,lo*sa);
  }
  return [toSrgb(cl(lin[0])),toSrgb(cl(lin[1])),toSrgb(cl(lin[2]))];
}
function wheelImage(N,L,mode){
  if(!offc) offc=document.createElement("canvas");
  offc.width=N; offc.height=N;
  var o=offc.getContext("2d"), img=o.createImageData(N,N), d=img.data, Rp=N/2;
  for(var y=0;y<N;y++) for(var x=0;x<N;x++){
    var dx=x-Rp+0.5, dy=y-Rp+0.5, r=Math.sqrt(dx*dx+dy*dy)/Rp, i=(y*N+x)*4;
    if(r>1){ d[i+3]=0; continue; }
    var hue=(Math.atan2(dx,-dy)*180/Math.PI+360)%360;
    var rgb=mode==="oklch"?fastOklchRgb(L,r*CMAX,hue):hsl2rgb(hue,r,L);
    d[i]=Math.round(cl(rgb[0])*255); d[i+1]=Math.round(cl(rgb[1])*255); d[i+2]=Math.round(cl(rgb[2])*255);
    d[i+3]=r>0.97?Math.round(255*(1-(r-0.97)/0.03)):255;
  }
  o.putImageData(img,0,0); return offc;
}
function drawWheel(){
  cvs=byId("wheel"); if(!cvs) return;
  var rect=cvs.getBoundingClientRect(), size=Math.max(150,Math.round(rect.width));
  var dpr=Math.min(2,window.devicePixelRatio||1);
  cvs.width=Math.round(size*dpr); cvs.height=Math.round(size*dpr);
  ctx=cvs.getContext("2d"); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,size,size);
  var N=Math.min(ui.mode==="oklch"?320:520,Math.round(size*dpr));
  ctx.imageSmoothingEnabled=true; if("imageSmoothingQuality" in ctx) ctx.imageSmoothingQuality="high";
  ctx.drawImage(wheelImage(N,ui.co.l,ui.mode),0,0,N,N,0,0,size,size);
  var R=size/2, H=harmony();
  function pos(h,s){ var a=h*Math.PI/180; return [R+Math.sin(a)*s*R, R-Math.cos(a)*s*R]; }
  if(ui.dots) COLORS.forEach(function(c){
    var co=coordsOf(c.hex,ui.mode), p=pos(co.h,Math.min(1,co.s));
    ctx.beginPath(); ctx.arc(p[0],p[1],3.3,0,6.2832); ctx.fillStyle=c.hex; ctx.fill();
    ctx.lineWidth=1.2; ctx.strokeStyle="rgba(0,0,0,.55)"; ctx.stroke();
    ctx.beginPath(); ctx.arc(p[0],p[1],4.7,0,6.2832); ctx.lineWidth=1; ctx.strokeStyle="rgba(255,255,255,.5)"; ctx.stroke();
  });
  H.forEach(function(h,i){
    var co=coordsOf(h.hex,ui.mode), p=pos(co.h,Math.min(1,co.s)), rr=i===0?13:9;
    ctx.beginPath(); ctx.moveTo(R,R); ctx.lineTo(p[0],p[1]);
    ctx.lineWidth=i===0?2:1.2; ctx.strokeStyle="rgba(0,0,0,.45)"; ctx.stroke();
    ctx.beginPath(); ctx.arc(p[0],p[1],rr,0,6.2832); ctx.fillStyle=h.hex; ctx.fill();
    ctx.lineWidth=3; ctx.strokeStyle="#FFFFFF"; ctx.stroke();
    ctx.beginPath(); ctx.arc(p[0],p[1],rr+1.7,0,6.2832); ctx.lineWidth=1.5; ctx.strokeStyle="rgba(0,0,0,.7)"; ctx.stroke();
  });
}
function dotAt(px,py,R){
  /* ¿el clic cayó sobre uno de tus marcadores dibujados en la rueda? */
  var best=null, bd=14;
  COLORS.forEach(function(c){
    var co=coordsOf(c.hex,ui.mode), a=co.h*Math.PI/180, s=Math.min(1,co.s);
    var x=R+Math.sin(a)*s*R, y=R-Math.cos(a)*s*R;
    var d=Math.sqrt((px-x)*(px-x)+(py-y)*(py-y));
    if(d<bd){ bd=d; best=c; }
  });
  return best;
}
function pickFromEvent(ev,fromDrag){
  var rect=cvs.getBoundingClientRect();
  var R=rect.width/2, px=(ev.clientX-rect.left), py=(ev.clientY-rect.top);
  if(!fromDrag){
    var hit=dotAt(px,py,R);
    if(hit){ ui.co=coordsOf(hit.hex,ui.mode); setPref("base",baseHex()); paintWheel(); return; }
  }
  var dx=px-R, dy=py-R;
  var r=Math.sqrt(dx*dx+dy*dy)/R; if(r>1) r=1;
  ui.co.h=(Math.atan2(dx,-dy)*180/Math.PI+360)%360; ui.co.s=r;
  setPref("base",baseHex()); paintWheel();
}
function idBlock(h,big){
  var c=h.id.color;
  if(!c) return '<div class="idnum num">—</div><div class="idname">Sin referencia</div>'+
    '<div class="hexline">'+esc(h.hex)+' · '+h.hue.toFixed(1)+'°</div>';
  return '<div class="idnum num">'+(h.id.exact?"":'<span style="opacity:.5">≈</span>')+esc(c.code)+'</div>'+
    '<div class="idname">'+esc(labelC(c))+'</div><div class="idalt">'+esc(c.es)+'</div>'+
    '<div class="hexline">'+esc(h.hex)+' · '+h.hue.toFixed(1)+'°</div>'+
    (big?'<div class="idtips">'+esc(tipsOf(c))+'</div>':'');
}
function stateBlock(h){
  if(!h.id.color) return '';
  var v=h.id.verdict, t=v==="ok"?"Lo tienes":(v==="mid"?"Aproximado":"No lo tienes");
  return '<span class="state s-'+v+'"><i></i>'+t+' · ΔE '+h.id.de.toFixed(1)+'</span>';
}
function actBlock(h){
  if(!h.id.color) return '';
  if(h.id.verdict==="ok") return '<button type="button" class="mini ghost" disabled>En el cajón</button>';
  return suggested(h.hex)
    ? '<button type="button" class="mini on" data-act="unsug" data-hex="'+esc(h.hex)+'">Anotado ✓</button>'
    : '<button type="button" class="mini" data-act="sug" data-hex="'+esc(h.hex)+'" data-role="'+esc(h.role)+'">Anotar para comprar</button>';
}
function sheetRueda(){
  return '<div class="stage">'+
    '<section class="card wheelcard">'+
      '<canvas id="wheel" role="img" aria-label="Rueda cromática. Haz clic o arrastra para elegir el color base."></canvas>'+
      '<p class="hint lbl">Ángulo = matiz · radio = saturación · los puntos son tus marcadores: pínchalos</p>'+
      '<div class="pickwrap"><div class="picklbl"><span class="lbl">Partir de un marcador del cajón</span>'+
        '<span class="lbl" id="pickcur"></span></div><div class="pickstrip" id="pickstrip"></div></div>'+
      '<div class="layer" id="layer" data-open="'+(ui.layer?"1":"0")+'">'+
        '<button type="button" data-act="layer" aria-expanded="'+(ui.layer?"true":"false")+'">'+
          '<span class="lbl">Motor de color</span><span class="sum" id="layersum"></span><span class="arrow">▾</span></button>'+
        '<div class="layerbody" id="layerbody"'+(ui.layer?"":" hidden")+'>'+
          '<div class="modeswi" role="group" aria-label="Modelo de color">'+
            '<button type="button" data-act="mode" data-k="hsl">HSL clásico</button>'+
            '<button type="button" data-act="mode" data-k="oklch">Perceptual</button></div>'+
          '<p class="modenote" id="modenote"></p>'+
          '<div class="sl"><label class="lbl" for="sl-sep">Separación</label><input type="range" id="sl-sep" min="5" max="90" step="1"><output id="ou-sep"></output></div>'+
          '<div class="sl"><label class="lbl" for="sl-h">Matiz</label><input type="range" id="sl-h" min="0" max="359" step="1"><output id="ou-h"></output></div>'+
          '<div class="sl"><label class="lbl" for="sl-s" id="lb-s">Saturación</label><input type="range" id="sl-s" min="0" max="100" step="1"><output id="ou-s"></output></div>'+
          '<div class="sl"><label class="lbl" for="sl-l">Luminosidad</label><input type="range" id="sl-l" min="0" max="100" step="1"><output id="ou-l"></output></div>'+
          '<label class="sl" style="grid-template-columns:auto 1fr;cursor:pointer"><input type="checkbox" id="dots" style="width:auto"><span class="lbl">Marcar mis colores en la rueda</span></label>'+
        '</div></div></section>'+
    '<section class="stack" id="stack"></section></div>';
}
function paintWheelResults(){
  var H=harmony(), el=byId("stack"); if(!el) return;
  var b=H[0];
  el.innerHTML='<article class="card hero" '+sty(b.hex)+'><div class="slab"></div>'+
    '<div class="info"><span class="lbl">Base</span>'+idBlock(b,true)+
    '<div style="margin-top:8px">'+stateBlock(b)+'</div></div></article>'+
    '<div class="trio">'+H.slice(1).map(function(h){
      return '<article class="card tile" '+sty(h.hex)+'>'+
        '<div class="slab"><span class="deg num">'+h.hue.toFixed(0)+'°</span></div>'+
        '<div class="info"><span class="lbl">'+esc(h.role)+'</span>'+idBlock(h,false)+
        stateBlock(h)+'<div class="act">'+actBlock(h)+'</div></div></article>';
    }).join("")+'</div>';
}
function paintWheelControls(){
  var s=byId("layersum"); if(!s) return;
  s.textContent=(ui.mode==="oklch"?"Perceptual":"HSL")+" · ±"+ui.sep+"°";
  var mb=document.querySelectorAll('[data-act="mode"]');
  for(var i=0;i<mb.length;i++) mb[i].setAttribute("aria-pressed",mb[i].getAttribute("data-k")===ui.mode?"true":"false");
  if(!ui.layer) return;
  byId("sl-h").value=Math.round(ui.co.h); byId("ou-h").textContent=Math.round(ui.co.h)+"°";
  byId("sl-s").value=Math.round(ui.co.s*100); byId("ou-s").textContent=Math.round(ui.co.s*100)+"%";
  byId("sl-l").value=Math.round(ui.co.l*100); byId("ou-l").textContent=Math.round(ui.co.l*100)+"%";
  byId("sl-sep").value=ui.sep; byId("ou-sep").textContent="±"+ui.sep+"°";
  byId("lb-s").textContent=ui.mode==="oklch"?"Croma":"Saturación";
  byId("dots").checked=ui.dots;
  byId("modenote").textContent=ui.mode==="oklch"
    ? "El matiz gira manteniendo el brillo y el croma que percibe el ojo. Los cuatro colores salen más parejos entre sí."
    : "El matiz gira manteniendo saturación y luminosidad: la rueda cromática de siempre.";
}
function paintStrip(){
  var el=byId("pickstrip"); if(!el) return;
  var cur=baseHex();
  el.innerHTML=COLORS.map(function(c){
    var on=c.hex===cur;
    return '<button type="button" class="pc" data-act="pickcolor" data-hex="'+esc(c.hex)+'" aria-pressed="'+(on?"true":"false")+'" '+
      'title="'+esc(c.code+" · "+labelC(c)+" ("+c.es+") · "+c.tips.join(", "))+'" '+sty(c.hex)+'>'+esc(c.code)+'</button>';
  }).join("");
  var lab=byId("pickcur");
  if(lab){
    var hit=null;
    COLORS.forEach(function(c){ if(c.hex===cur) hit=c; });
    lab.textContent = hit ? ("· "+hit.code+" "+labelC(hit)) : "· color libre";
  }
}
function paintWheel(){ paintWheelControls(); drawWheel(); paintWheelResults(); paintStrip(); }

/* ===================== lámina: escáner ===================== */
var camStream=null, camVideo=null, camCanvas=null, camTimer=null, detector=null, detectorTried=false;
function sheetEscaner(){
  return '<div class="scanwrap">'+
    '<section class="card camcard">'+
      '<div class="viewport" id="viewport"><div class="ph" id="camph">Sin imagen<br>Toma una foto del código, o escribe el número</div></div>'+
      '<div class="crow" style="gap:9px;flex-wrap:wrap">'+
        '<button type="button" class="big" data-act="photo">Tomar foto del código</button>'+
        '<button type="button" class="big alt" id="cambtn" data-act="cam">Cámara en vivo</button>'+
        '<button type="button" class="big alt" data-act="camstop" id="camstop" hidden>Detener</button>'+
      '</div>'+
      '<input type="file" id="photoin" accept="image/*" capture="environment" hidden>'+
      '<form class="manual" id="manualform" autocomplete="off">'+
        '<input type="text" id="eanin" inputmode="numeric" placeholder="4902778…" aria-label="Código de barras" maxlength="20">'+
        '<button type="submit" class="big alt">Buscar</button>'+
      '</form>'+
      '<p class="camnote" id="camnote"></p>'+
    '</section>'+
    '<section><div id="scanresult"></div>'+
      '<div class="blk"><div class="blkhead"><h2>Códigos registrados</h2>'+
        '<span class="h" id="reghint"></span></div><div id="reglist"></div></div>'+
    '</section></div>';
}
function camMsg(){
  var n=byId("camnote"); if(!n) return;
  if(ui.scan.msg){ n.innerHTML='<b>'+esc(ui.scan.msg)+'</b>'; return; }
  n.innerHTML = ui.scan.err
    ? '<b>'+esc(ui.scan.err)+'</b> Prueba con «Tomar foto del código», o escribe el número que va bajo las barras.'
    : '«Tomar foto» abre la cámara del teléfono y lee la foto: es el camino que funciona aunque el visor no deje abrir la cámara en vivo. La primera vez que leas un código, dime a qué marcador corresponde y queda memorizado.';
}
function paintReg(){
  var el=byId("reglist"); if(!el) return;
  var l=state.eans.slice().sort(function(a,b){ return (tipInfo(a.tipo).ord-tipInfo(b.tipo).ord)||cmpCode(a.codigo,b.codigo); });
  byId("reghint").textContent=l.length?l.length+(l.length===1?" código":" códigos"):"";
  el.innerHTML=l.length ? '<div class="buy">'+l.map(function(e){
      var mk=skuMarkers(e.tipo,e.codigo)[0], n=pname(e.codigo);
      return '<div class="regrow" '+sty(mk?mk.hex:"")+'><span class="sl3" style="width:26px;height:26px"></span>'+
        '<span class="g"><b class="code">'+esc(e.ean)+'</b><br><span class="mt">'+esc(e.tipo)+' '+esc(e.codigo)+
        (n?' · '+esc(n.en):"")+'</span></span>'+
        '<span class="badge '+(e.verificado?"b-ok":"b-un")+'">'+(e.verificado?"Verificado":"Sin verificar")+'</span>'+
        '<button type="button" class="tiny" data-act="ean-del" data-ean="'+esc(e.ean)+'">Quitar</button></div>';
    }).join("")+'</div>'
    : emptyBox("Todavía no hay códigos","Escanea un marcador y vincúlalo una vez: desde ahí ese código lo identifica solo.");
}
function paintScan(){
  var el=byId("scanresult"); if(!el) return;
  paintReg(); camMsg();
  var code=ui.scan.code;
  if(!code){ el.innerHTML=emptyBox("Sin código","Escanea el código de barras del marcador o escríbelo a mano. Te digo al tiro si ya lo tienes en el cajón."); return; }
  var valid=eanValid(code)||code.length===8;
  var reg=findEan(code);
  if(reg){
    var mks=skuMarkers(reg.tipo,reg.codigo), n=pname(reg.codigo), hex=mks.length?mks[0].hex:"";
    el.innerHTML='<article class="card result" '+sty(hex)+'>'+
      '<div class="rhead"><div class="slab"></div><div class="rin">'+
        '<span class="lbl">Código reconocido</span>'+
        '<span class="eanline">'+esc(code)+'</span>'+
        '<div class="idnum num" style="font-size:34px;margin-top:6px">'+esc(reg.codigo)+'</div>'+
        '<div class="idname">'+esc(n?n.en:(mks[0]?mks[0].color:""))+'</div>'+
        '<div class="idalt">'+esc(n?n.es:"")+' · '+esc(reg.tipo)+'</div>'+
      '</div></div>'+
      '<div class="rbody">'+
        (reg.verificado?'':'<div class="confirm"><span class="t">Este código lo precargué desde una tienda y <b>no está verificado</b>. ¿Corresponde a este marcador?</span>'+
          '<button type="button" class="big" data-act="ean-ok" data-ean="'+esc(code)+'">Sí, es este</button>'+
          '<button type="button" class="big alt" data-act="ean-relink" data-ean="'+esc(code)+'">No, es otro</button></div>')+
        (mks.length
          ? '<div class="invgrid">'+mks.map(invCard).join("")+'</div>'
          : emptyBox("El marcador ya no está en el cajón","El código sigue registrado, pero no queda ninguna unidad de ese número y punta."))+
        '<div class="crow" style="gap:9px;flex-wrap:wrap">'+
          '<button type="button" class="big" data-act="ean-buy" data-ean="'+esc(code)+'">Registrar otra unidad comprada hoy</button>'+
          '<button type="button" class="big alt" data-act="ean-relink" data-ean="'+esc(code)+'">Vincular a otro marcador</button>'+
        '</div>'+
      '</div></article>';
    return;
  }
  /* código nuevo */
  var q=ui.scanq.trim().toLowerCase();
  var opts=skuList().filter(function(s){
    if(state.eans.some(function(e){ return e.tipo===s.tipo&&e.codigo===s.codigo; })) return false;
    if(!q) return true;
    var n=pname(s.codigo);
    return (s.tipo+" "+s.codigo+" "+(n?n.en+" "+n.es:"")).toLowerCase().indexOf(q)>=0;
  });
  el.innerHTML='<article class="card result">'+
    '<div class="rhead"><div class="slab" style="background:var(--panel3)"></div><div class="rin">'+
      '<span class="lbl">'+(valid?"Código nuevo":"Código con dígito de control inválido")+'</span>'+
      '<span class="eanline">'+esc(code)+'</span>'+
      '<div class="idalt" style="margin-top:6px">'+(valid
        ? "No está en el registro. Dime a qué marcador corresponde y lo memorizo."
        : "Ese número no cuadra con un EAN-13 válido: puede estar mal leído o mal tecleado. Puedes vincularlo igual, o volver a escanear.")+'</div>'+
    '</div></div>'+
    '<div class="rbody">'+
      '<label class="search"><span class="lbl" aria-hidden="true">Buscar</span>'+
      '<input type="search" id="scanq" placeholder="Número o nombre del marcador…" value="'+esc(ui.scanq)+'" aria-label="Buscar marcador para vincular"></label>'+
      (opts.length
        ? '<div class="linklist">'+opts.map(function(s){
            var n=pname(s.codigo);
            return '<button type="button" class="linkrow" data-act="link" data-ean="'+esc(code)+'" data-tipo="'+esc(s.tipo)+'" data-cod="'+esc(s.codigo)+'" '+sty(s.hex)+'>'+
              '<span class="sw"></span><span class="g"><b>'+esc(s.codigo)+' · '+esc(n?n.en:(s.mk.color||"—"))+'</b>'+
              '<span>'+esc(s.tipo)+(n?' · '+esc(n.es):"")+'</span></span></button>';
          }).join("")+'</div>'
        : emptyBox("Sin marcadores libres","Todos los marcadores del cajón ya tienen un código vinculado. Si este es de otro producto, anótalo como color que no tienes."))+
      '<div class="crow" style="gap:9px;flex-wrap:wrap">'+
        '<button type="button" class="big alt" data-act="ean-wish" data-ean="'+esc(code)+'">No lo tengo · anotar para comprar</button>'+
        '<button type="button" class="big alt" data-act="scan-clear">Limpiar</button>'+
      '</div>'+
    '</div></article>';
  var s=byId("scanq");
  if(s) s.addEventListener("input",function(e){ ui.scanq=e.target.value; paintScan(); byId("scanq").focus(); });
}
function showPhoto(url){
  var vp=byId("viewport"); if(!vp) return;
  vp.innerHTML='<img src="'+url+'" alt="Foto del código de barras" style="width:100%;height:100%;object-fit:contain;background:#000">';
}
function handlePhoto(file){
  if(!file) return;
  stopCam();
  ui.scan.err=""; ui.scan.msg="Leyendo la foto…"; camMsg();
  var url=URL.createObjectURL(file), img=new Image();
  img.onload=function(){
    showPhoto(url);
    var MAX=1700, sc=Math.min(1,MAX/Math.max(img.width,img.height));
    var cv=document.createElement("canvas");
    cv.width=Math.max(1,Math.round(img.width*sc)); cv.height=Math.max(1,Math.round(img.height*sc));
    cv.getContext("2d",{willReadFrequently:true}).drawImage(img,0,0,cv.width,cv.height);
    decodeCanvasAsync(cv).then(function(code){
      ui.scan.msg="";
      if(code){ onCode(code); }
      else {
        ui.scan.err="No logré leer el código en esa foto.";
        camMsg();
        var e=byId("eanin"); if(e) e.focus();
      }
    });
  };
  img.onerror=function(){ URL.revokeObjectURL(url); ui.scan.msg=""; ui.scan.err="No pude abrir esa imagen."; camMsg(); };
  img.src=url;
}
function stopCam(){
  if(camTimer){ clearTimeout(camTimer); camTimer=null; }
  if(camStream){ camStream.getTracks().forEach(function(t){ t.stop(); }); camStream=null; }
  ui.scan.active=false;
  var vp=byId("viewport");
  if(vp) vp.innerHTML='<div class="ph" id="camph">Sin imagen<br>Toma una foto del código, o escribe el número</div>';
  var b=byId("camstop"); if(b) b.hidden=true;
  var c=byId("cambtn"); if(c) c.textContent="Escanear con la cámara";
}
function onCode(code){
  code=normalizeCode(code);
  if(!code){ return; }
  ui.scan.code=code; ui.scanq=""; ui.scan.msg=""; ui.scan.err="";
  stopCam();
  paintScan();
  try{ if(navigator.vibrate) navigator.vibrate(40); }catch(e){}
}
function scanTick(){
  if(!ui.scan.active||!camVideo) return;
  try{
    var vw=camVideo.videoWidth, vh=camVideo.videoHeight;
    if(vw&&vh){
      if(!camCanvas) camCanvas=document.createElement("canvas");
      var W=Math.min(900,vw); var scale=W/vw, H=Math.round(vh*scale);
      camCanvas.width=W; camCanvas.height=H;
      var x=camCanvas.getContext("2d",{willReadFrequently:true});
      x.drawImage(camVideo,0,0,W,H);
      if(detector){
        detector.detect(camCanvas).then(function(res){
          if(res&&res.length&&res[0].rawValue){ onCode(res[0].rawValue); }
          else { camTimer=setTimeout(scanTick,180); }
        }).catch(function(){ camTimer=setTimeout(scanTick,300); });
        return;
      }
      var got=decodeFromCanvasEl(camCanvas);
      if(got){ onCode(got); return; }
    }
  }catch(e){ /* seguimos intentando */ }
  camTimer=setTimeout(scanTick,150);
}
function startCam(){
  ui.scan.err="";
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){
    ui.scan.err="Este navegador no deja abrir la cámara desde aquí."; camMsg(); return;
  }
  var vp=byId("viewport");
  vp.innerHTML='<div class="ph">Pidiendo permiso de cámara…</div>';
  navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"},width:{ideal:1280}}})
  .then(function(st){
    camStream=st; ui.scan.active=true; ui.scan.err="";
    vp.innerHTML='<video id="cam" playsinline muted autoplay></video><div class="reticle"></div>';
    camVideo=byId("cam"); camVideo.srcObject=st;
    var pl=camVideo.play(); if(pl&&pl.catch) pl.catch(function(){});
    byId("camstop").hidden=false; byId("cambtn").textContent="Reintentar";
    camMsg();
    if(!detectorTried){
      detectorTried=true;
      try{
        if("BarcodeDetector" in window){
          detector=new window.BarcodeDetector({formats:["ean_13","upc_a","ean_8"]});
        }
      }catch(e){ detector=null; }
    }
    camTimer=setTimeout(scanTick,300);
  })
  .catch(function(err){
    var name=(err&&err.name)||"";
    ui.scan.err = name==="NotAllowedError" ? "Bloqueaste el permiso de cámara (o el visor no lo permite aquí)."
      : name==="NotFoundError" ? "No encontré ninguna cámara en este equipo."
      : name==="NotReadableError" ? "La cámara está ocupada por otra aplicación."
      : "No pude abrir la cámara aquí.";
    ui.scan.active=false;
    vp.innerHTML='<div class="ph">'+esc(ui.scan.err)+'</div>';
    camMsg();
    var e2=byId("eanin"); if(e2) e2.focus();
  });
}

/* ===================== modal ===================== */
function openModal(id){
  var mk=id?findMk(id):null;
  ui.modal = mk ? JSON.parse(JSON.stringify(mk)) : sanitizeMarker({tipo:"PC-5M",hex:"",cantidad:1,estado:"nuevo"});
  ui.modal._new=!mk; ui.modal._del=false;
  paintModal();
}
function closeModal(){ ui.modal=null; byId("overlay").innerHTML=""; document.body.style.overflow=""; }
function paintModal(){
  var mk=ui.modal, ov=byId("overlay");
  if(!mk){ ov.innerHTML=""; document.body.style.overflow=""; return; }
  document.body.style.overflow="hidden";
  var tops=allTipos(), known=tops.indexOf(mk.tipo)>=0;
  var n=pname(mk.codigo);
  var eans=state.eans.filter(function(e){ return e.tipo===mk.tipo&&e.codigo===mk.codigo; });
  ov.innerHTML='<div class="backdrop" data-act="backdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="'+
    (mk._new?"Agregar marcador":"Editar marcador")+'">'+
    '<div class="mhead"><h2>'+(mk._new?"Agregar marcador":"Editar marcador")+'</h2>'+
      '<button type="button" class="tiny" data-act="mclose">Cerrar</button></div>'+
    '<div class="mbody">'+
      '<div class="fgrid">'+
        '<div class="field"><label for="f-tipo">Punta</label><select id="f-tipo">'+
          tops.map(function(t){ return '<option value="'+esc(t)+'"'+(t===mk.tipo?" selected":"")+'>'+esc(t)+' · '+esc(tipInfo(t).ancho)+'</option>'; }).join("")+
          '<option value="__otra"'+(known?"":" selected")+'>Otra punta…</option></select></div>'+
        '<div class="field" id="wrap-otra"'+(known?" hidden":"")+'><label for="f-otra">Nombre de la punta</label>'+
          '<input type="text" id="f-otra" value="'+esc(known?"":mk.tipo)+'" placeholder="PC-17K"></div>'+
        '<div class="field"><label for="f-cod">Número POSCA</label><input type="text" id="f-cod" value="'+esc(mk.codigo)+'" placeholder="72">'+
          '<span class="mt" id="f-hint"></span></div>'+
        '<div class="field"><label for="f-color">Nombre (si el número no está en la gama)</label>'+
          '<input type="text" id="f-color" value="'+esc(mk.color)+'" placeholder="'+(n?esc(n.en):"Nombre libre")+'"></div>'+
        '<div class="field"><label for="f-hexr">Color</label><div class="crow">'+
          '<input type="color" id="f-hex" value="'+esc(mk.hex||"#8AA6FF")+'" aria-label="Selector de color">'+
          '<input type="text" id="f-hexr" class="mono" value="'+esc(mk.hex)+'" placeholder="#7DC242" spellcheck="false"></div></div>'+
        '<div class="field"><label for="f-fam">Familia</label><select id="f-fam">'+
          FAMILIAS.map(function(f){ return '<option value="'+f.k+'"'+(f.k===mk.familia?" selected":"")+'>'+f.label+'</option>'; }).join("")+'</select></div>'+
        '<div class="field"><label for="f-cant">Cantidad</label><input type="number" id="f-cant" min="0" step="1" value="'+mk.cantidad+'"></div>'+
        '<div class="field"><label for="f-est">Estado</label><select id="f-est">'+
          ESTADOS.map(function(e){ return '<option value="'+e.k+'"'+(e.k===mk.estado?" selected":"")+'>'+e.label+'</option>'; }).join("")+'</select></div>'+
        '<div class="field"><label for="f-fecha">Fecha de compra</label><input type="date" id="f-fecha" value="'+esc(mk.fechaCompra)+'"></div>'+
      '</div>'+
      '<label class="chip" style="align-self:flex-start;padding:7px 13px;cursor:pointer">'+
        '<input type="checkbox" id="f-rep"'+(mk.reponer?" checked":"")+'> Marcar para reponer</label>'+
      '<div class="field"><label for="f-notas">Notas</label><textarea id="f-notas" placeholder="Estado de la punta, dónde lo compraste, para qué lo usas…">'+esc(mk.notas)+'</textarea></div>'+
      (eans.length?'<div class="field"><label>Códigos de barras vinculados</label><div class="mt">'+
        eans.map(function(e){ return esc(e.ean)+(e.verificado?" ✓":" (sin verificar)"); }).join("<br>")+'</div></div>':'')+
      '<div class="err" id="f-err"></div>'+
    '</div>'+
    '<div class="mfoot">'+
      (mk._new?'':(mk._del
        ? '<span class="err" style="align-self:center">¿Eliminar?</span><button type="button" class="dangerbtn" data-act="mdel-yes">Sí, eliminar</button><button type="button" class="big alt" data-act="mdel-no">Cancelar</button>'
        : '<button type="button" class="dangerbtn" data-act="mdel">Eliminar</button>'))+
      '<span class="sp"></span><button type="button" class="big alt" data-act="mclose">Cancelar</button>'+
      '<button type="button" class="big" data-act="msave">'+(mk._new?"Agregar":"Guardar")+'</button>'+
    '</div></div></div>';
  var t=byId("f-tipo");
  t.addEventListener("change",function(){ byId("wrap-otra").hidden=t.value!=="__otra"; if(t.value==="__otra") byId("f-otra").focus(); });
  var hx=byId("f-hex"), hr=byId("f-hexr");
  hx.addEventListener("input",function(){ hr.value=hx.value.toUpperCase(); });
  hr.addEventListener("input",function(){ var v=normHex(hr.value); if(v) hx.value=v; });
  var f=byId("f-cod"), hint=byId("f-hint");
  function codeHint(fill){
    var n=pname(byId("f-cod").value.trim());
    hint.textContent = n ? (n.en+" · "+n.es) : (byId("f-cod").value.trim()?"Número fuera del catálogo: ponle nombre y color a mano":"");
    if(n&&fill&&!normHex(hr.value)){ hr.value=n.hex; hx.value=n.hex; byId("f-fam").value=n.fam; }
  }
  if(f){ f.addEventListener("input",function(){ codeHint(true); }); codeHint(false); f.focus(); }
}
function saveModal(){
  var mk=ui.modal; if(!mk) return;
  var t=byId("f-tipo").value; if(t==="__otra") t=byId("f-otra").value.trim();
  if(!t){ byId("f-err").textContent="Falta la punta: elige una o escribe su nombre."; return; }
  var cant=parseInt(byId("f-cant").value,10); if(!isFinite(cant)||cant<0) cant=0;
  var est=byId("f-est").value; if(cant===0) est="agotado";
  var next=sanitizeMarker({id:mk.id, tipo:t, codigo:byId("f-cod").value, color:byId("f-color").value,
    hex:byId("f-hexr").value, familia:byId("f-fam").value, cantidad:cant, estado:est,
    reponer:byId("f-rep").checked, fechaCompra:byId("f-fecha").value, actualizado:today(), notas:byId("f-notas").value});
  if(mk._new) state.markers.push(next);
  else for(var i=0;i<state.markers.length;i++) if(state.markers[i].id===next.id) state.markers[i]=next;
  closeModal(); queueSave(); render();
}

/* ===================== acciones ===================== */
function addSug(hex,role){
  hex=String(hex).toUpperCase(); if(suggested(hex)) return;
  var H=harmony(), b=H[0], bc=b.id.color, here=identify(hex).color;
  var origen=(b.id.exact&&bc)?(bc.code+" "+labelC(bc)):("color "+b.hex);
  state.suggestions.push(sanitizeSug({color:colorName(hex), hex:hex,
    motivo:(role==="Base"?"Base elegida en la rueda":role+" de "+origen)+" · "+(ui.mode==="oklch"?"perceptual":"HSL"),
    cercano:here?(here.code+" "+labelC(here)+" ("+here.es+")"):"", fechaAgregada:today(), origen:"rueda"}));
  queueSave(); render();
}
function linkEan(code,tipo,codigo,verificado){
  var e=findEan(code);
  if(e){ e.tipo=tipo; e.codigo=codigo; e.verificado=verificado!==false; e.fecha=today(); e.fuente="escaneo"; }
  else state.eans.push(sanitizeEan({ean:code,tipo:tipo,codigo:codigo,verificado:verificado!==false,fuente:"escaneo",fecha:today()}));
  ui.scan.code=code; ui.scanq="";
  queueSave(); render();
}
function buyAnother(code){
  var e=findEan(code); if(!e) return;
  var src=skuMarkers(e.tipo,e.codigo)[0];
  state.markers.push(sanitizeMarker({tipo:e.tipo, codigo:e.codigo, hex:src?src.hex:"", familia:src?src.familia:"estandar",
    cantidad:1, estado:"nuevo", fechaCompra:today(), actualizado:today(), notas:"Registrada desde el escáner."}));
  queueSave(); render();
}
function wishFromCode(code){
  if(state.suggestions.some(function(s){ return s.ean===code; })) return;
  state.suggestions.push(sanitizeSug({color:"Marcador sin identificar", hex:"", ean:code,
    motivo:"Código escaneado que no está en el cajón", fechaAgregada:today(), origen:"escaner"}));
  queueSave(); render();
}

/* ===================== marco ===================== */
var SHEETS=[["cajon","Cajón"],["rueda","Rueda"],["escaner","Escáner"],["compras","Compras"]];
function shell(){
  return '<div class="app">'+
    '<header class="bar">'+
      '<div class="word"><b>POSCA</b><span>Cajón</span></div>'+
      '<div class="swi" role="group" aria-label="Vista">'+
        SHEETS.map(function(s){ return '<button type="button" data-act="sheet" data-k="'+s[0]+'">'+esc(s[1])+'</button>'; }).join("")+
      '</div>'+
      '<button type="button" class="chipbtn" id="savechip" data-s="idle" data-act="data" title="Datos y respaldo"><span class="dotst"></span><span class="txt">Listo</span></button>'+
    '</header>'+
    '<main class="sheet" id="sheet"></main>'+
    '<div class="foot"><p id="footnote"></p></div>'+
    '<div id="overlay"></div></div>';
}
var mounted=null;
function render(){
  rebuildColors();
  if(!ui.co){
    var b=pref("base","#D8232A"); if(!/^#[0-9A-Fa-f]{6}$/.test(b)) b="#D8232A";
    ui.co=coordsOf(b.toUpperCase(),ui.mode);
  }
  var sh=byId("sheet");
  if(mounted!==ui.sheet){
    if(mounted==="escaner") stopCam();
    sh.innerHTML = ui.sheet==="cajon"?sheetCajon():ui.sheet==="rueda"?sheetRueda():ui.sheet==="escaner"?sheetEscaner():sheetCompras();
    mounted=ui.sheet; setPref("sheet",ui.sheet);
    if(ui.sheet==="cajon") bindCajon();
    if(ui.sheet==="rueda") bindWheel();
    if(ui.sheet==="escaner") bindScan();
  }
  var sb=document.querySelectorAll('[data-act="sheet"]');
  for(var i=0;i<sb.length;i++) sb[i].setAttribute("aria-pressed",sb[i].getAttribute("data-k")===ui.sheet?"true":"false");
  byId("footnote").textContent = ui.readOnly
    ? "Solo lectura: puedes mirar, pero los cambios no se guardarán."
    : "Cada marcador se identifica por su número POSCA, el nombre de la gama y —cuando lo escaneas— su código de barras. Los cambios se guardan solos en este dispositivo; en la pastilla de arriba puedes exportar un respaldo.";
  if(ui.sheet==="cajon"){ paintStats(); paintChips(); paintInv(); }
  else if(ui.sheet==="rueda") paintWheel();
  else if(ui.sheet==="escaner") paintScan();
  else paintCompras();
}
function bindCajon(){
  var q=byId("q"); if(q) q.addEventListener("input",function(e){ ui.q=e.target.value; paintInv(); });
}
function bindWheel(){
  cvs=byId("wheel"); var drag=false;
  cvs.addEventListener("pointerdown",function(e){ drag=true; try{cvs.setPointerCapture(e.pointerId);}catch(x){} pickFromEvent(e); e.preventDefault(); });
  cvs.addEventListener("pointermove",function(e){ if(drag) pickFromEvent(e,true); });
  cvs.addEventListener("pointerup",function(){ drag=false; });
  cvs.addEventListener("pointercancel",function(){ drag=false; });
  if(ui.layer) bindSliders();
}
function bindSliders(){
  function f(id,fn){ var e=byId(id); if(e) e.addEventListener("input",function(ev){ fn(ev.target.value); setPref("base",baseHex()); paintWheel(); }); }
  f("sl-h",function(v){ ui.co.h=parseFloat(v); });
  f("sl-s",function(v){ ui.co.s=parseFloat(v)/100; });
  f("sl-l",function(v){ ui.co.l=parseFloat(v)/100; });
  var s=byId("sl-sep"); if(s) s.addEventListener("input",function(e){ ui.sep=parseInt(e.target.value,10); setPref("sep",ui.sep); paintWheel(); });
  var d=byId("dots"); if(d) d.addEventListener("change",function(e){ ui.dots=e.target.checked; setPref("dots",ui.dots?"1":"0"); drawWheel(); });
}
function bindScan(){
  var f=byId("manualform");
  if(f) f.addEventListener("submit",function(e){ e.preventDefault(); var v=byId("eanin").value; if(v.replace(/\D/g,"")) onCode(v); });
  var p=byId("photoin");
  if(p) p.addEventListener("change",function(e){ handlePhoto(e.target.files&&e.target.files[0]); });
}

/* ===================== eventos ===================== */
document.addEventListener("click",function(ev){
  var el=ev.target.closest?ev.target.closest("[data-act]"):null; if(!el) return;
  var a=el.getAttribute("data-act"), id=el.getAttribute("data-id"), k=el.getAttribute("data-k"), mk;
  if((a==="backdrop"||a==="dbackdrop")&&ev.target!==el) return;
  switch(a){
    case "sheet": ui.sheet=k; render(); window.scrollTo(0,0); break;
    case "ftipo": if(ui.tipos[k]) delete ui.tipos[k]; else ui.tipos[k]=true; paintChips(); paintInv(); break;
    case "festado": if(ui.estados[k]) delete ui.estados[k]; else ui.estados[k]=true; paintChips(); paintInv(); break;
    case "solorep": ui.soloRep=!ui.soloRep; paintChips(); paintInv(); break;
    case "clearf": ui.tipos={}; ui.estados={}; ui.soloRep=false; ui.q=""; if(byId("q")) byId("q").value=""; paintChips(); paintInv(); break;
    case "inc": mk=findMk(id); if(mk){ mk.cantidad++; if(mk.estado==="agotado") mk.estado="nuevo"; touch(mk); queueSave(); render(); } break;
    case "dec": mk=findMk(id); if(mk&&mk.cantidad>0){ mk.cantidad--; if(mk.cantidad===0) mk.estado="agotado"; touch(mk); queueSave(); render(); } break;
    case "rep": mk=findMk(id); if(mk){ mk.reponer=!mk.reponer; touch(mk); queueSave(); render(); } break;
    case "towheel": (function(){ var h=el.getAttribute("data-hex");
      if(h){ ui.co=coordsOf(h,ui.mode); setPref("base",baseHex()); }
      ui.sheet="rueda"; render(); window.scrollTo(0,0); })(); break;
    case "edit": openModal(id); break;
    case "add": openModal(null); break;
    case "mclose": case "backdrop": closeModal(); break;
    case "data": if(swWaiting){ applyUpdate(); } else openData(); break;
    case "dclose": case "dbackdrop": closeData(); break;
    case "dexport": exportBackup(); break;
    case "dcopy": copyBackup(); break;
    case "dimport": (function(){ var i=byId("importin"); if(i){ i.value=""; i.click(); } })(); break;
    case "dimport-ok": applyImport(); break;
    case "dimport-no": ui.data.pending=null; paintData(); break;
    case "dreset": ui.data.confirm=k; paintData(); break;
    case "dreset-no": ui.data.confirm=""; paintData(); break;
    case "dreset-yes": resetInventory(k); break;
    case "dcheck": checkUpdate(); break;
    case "dupdate": applyUpdate(); break;
    case "dinstall": (function(){ if(installEvt){ installEvt.prompt(); installEvt=null; closeData(); } })(); break;
    case "msave": saveModal(); break;
    case "mdel": ui.modal._del=true; paintModal(); break;
    case "mdel-no": ui.modal._del=false; paintModal(); break;
    case "mdel-yes": state.markers=state.markers.filter(function(x){ return x.id!==ui.modal.id; }); closeModal(); queueSave(); render(); break;
    case "layer":
      ui.layer=!ui.layer; setPref("layer",ui.layer?"1":"0");
      byId("layer").setAttribute("data-open",ui.layer?"1":"0");
      el.setAttribute("aria-expanded",ui.layer?"true":"false");
      byId("layerbody").hidden=!ui.layer;
      if(ui.layer){ paintWheelControls(); bindSliders(); }
      break;
    case "mode": if(k!==ui.mode){ var hx=baseHex(); ui.mode=k; ui.co=coordsOf(hx,k); setPref("mode",k); paintWheel(); } break;
    case "pickcolor": ui.co=coordsOf(el.getAttribute("data-hex"),ui.mode); setPref("base",baseHex()); paintWheel(); break;
    case "sug": addSug(el.getAttribute("data-hex"),el.getAttribute("data-role")); break;
    case "unsug": (function(){ var h=String(el.getAttribute("data-hex")).toUpperCase();
      state.suggestions=state.suggestions.filter(function(s){ return s.hex!==h; }); queueSave(); render(); })(); break;
    case "sug-del": state.suggestions=state.suggestions.filter(function(s){ return s.id!==id; }); queueSave(); render(); break;
    case "sug-buy": (function(){ var s=findSug(id); if(s){ s.estado="comprada"; queueSave(); render(); } })(); break;
    case "photo": (function(){ var i=byId("photoin"); if(i){ i.value=""; i.click(); } })(); break;
    case "cam": startCam(); break;
    case "camstop": stopCam(); break;
    case "scan-clear": ui.scan.code=""; ui.scanq=""; paintScan(); break;
    case "link": linkEan(el.getAttribute("data-ean"),el.getAttribute("data-tipo"),el.getAttribute("data-cod"),true); break;
    case "ean-ok": (function(){ var e=findEan(el.getAttribute("data-ean")); if(e){ e.verificado=true; e.fuente="confirmado al escanear"; queueSave(); render(); } })(); break;
    case "ean-relink": (function(){ var c=el.getAttribute("data-ean");
      state.eans=state.eans.filter(function(e){ return e.ean!==c; }); ui.scan.code=c; ui.scanq=""; queueSave(); render(); })(); break;
    case "ean-buy": buyAnother(el.getAttribute("data-ean")); break;
    case "ean-wish": wishFromCode(el.getAttribute("data-ean")); break;
    case "ean-del": (function(){ var c=el.getAttribute("data-ean");
      state.eans=state.eans.filter(function(e){ return e.ean!==c; }); queueSave(); render(); })(); break;
  }
});
document.addEventListener("change",function(ev){
  var el=ev.target;
  if(el.getAttribute&&el.getAttribute("data-act")==="estado"){
    var mk=findMk(el.getAttribute("data-id"));
    if(mk){ mk.estado=el.value; if(mk.estado!=="agotado"&&mk.cantidad===0) mk.cantidad=1; touch(mk); queueSave(); render(); }
  }
});
document.addEventListener("keydown",function(e){ if(e.key==="Escape"){ if(ui.modal) closeModal(); else if(ui.data.open) closeData(); } });
var rt=null;
window.addEventListener("resize",function(){ if(rt) clearTimeout(rt); rt=setTimeout(function(){ if(ui.sheet==="rueda") drawWheel(); },150); });
window.addEventListener("pagehide",function(){ stopCam(); });

window.__cx={hex2rgb:hex2rgb,rgb2hsl:rgb2hsl,hsl2rgb:hsl2rgb,hex2oklch:hex2oklch,oklch2hex:oklch2hex,
  hex2lab:hex2lab,deltaE2000:deltaE2000,rotate:rotate,nearest:nearest,coordsOf:coordsOf,hexOf:hexOf,
  colorName:colorName,eanValid:eanValid,normalizeCode:normalizeCode,decodeEANFromImage:decodeEANFromImage,decodeAnyOrientation:decodeAnyOrientation,handlePhoto:handlePhoto,
  onCode:onCode,state:function(){return state;},colors:function(){return COLORS;}};

/* ===================== datos: respaldo, importar, restaurar ===================== */
var swReg=null, swWaiting=null, installEvt=null;
function isIOS(){ return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform==="MacIntel" && navigator.maxTouchPoints>1); }
function isStandalone(){ return window.navigator.standalone===true || (window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches); }
function storageLabel(){ return storageMode==="idb"?"IndexedDB":storageMode==="ls"?"localStorage":storageMode==="seed"?"primera carga":"—"; }
function exportBackup(){
  var text=serialize(), name="cajon-posca-"+today()+".json";
  try{
    var blob=new Blob([text],{type:"application/json"}), url=URL.createObjectURL(blob);
    var a=document.createElement("a"); a.href=url; a.download=name; document.body.appendChild(a); a.click();
    setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); },1500);
    ui.data.msg="Respaldo generado: "+name;
  }catch(e){ ui.data.msg="No pude generar el archivo; usa «Copiar JSON»."; }
  paintData();
}
function copyBackup(){
  var text=serialize();
  function done(ok){ ui.data.msg=ok?"JSON copiado al portapapeles.":"No pude copiar; selecciona el texto de abajo."; ui.data.showRaw=!ok; paintData(); }
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function(){done(true);},function(){done(false);});
  else done(false);
}
function importBackupFile(file){
  if(!file) return;
  var r=new FileReader();
  r.onload=function(){ importBackupText(String(r.result||"")); };
  r.onerror=function(){ ui.data.msg="No pude leer el archivo."; paintData(); };
  r.readAsText(file);
}
function importBackupText(text){
  var s=parseState(text);
  if(!s){ ui.data.msg="Ese archivo no es un respaldo válido del Cajón POSCA."; paintData(); return; }
  ui.data.pending=s; ui.data.msg=""; paintData();
}
function applyImport(){
  if(!ui.data.pending) return;
  state=ui.data.pending; ui.data.pending=null;
  ui.data.msg="Respaldo importado: "+state.markers.length+" unidades, "+state.suggestions.length+" anotaciones, "+state.eans.length+" códigos.";
  queueSave(); render(); paintData();
}
function resetInventory(kind){
  state = kind==="vacio" ? {version:3,markers:[],suggestions:[],eans:[],actualizado:today()} : freshState();
  ui.data.confirm=""; ui.data.msg = kind==="vacio" ? "Cajón vaciado." : "Inventario base restaurado.";
  queueSave(); render(); paintData();
}
function openData(){ ui.data.open=true; ui.data.msg=""; ui.data.pending=null; ui.data.confirm=""; ui.data.showRaw=false; paintData(); }
function closeData(){ ui.data.open=false; byId("overlay").innerHTML=""; document.body.style.overflow=""; }
function paintData(){
  if(!ui.data.open) return;
  var ov=byId("overlay"); document.body.style.overflow="hidden";
  var un=0; state.markers.forEach(function(m){ un+=m.cantidad; });
  var p=ui.data.pending, pun=0; if(p) p.markers.forEach(function(m){ pun+=m.cantidad; });
  var h='<div class="backdrop" data-act="dbackdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="Datos">'+
    '<div class="mhead"><h2>Datos y respaldo</h2><button type="button" class="tiny" data-act="dclose">Cerrar</button></div>'+
    '<div class="mbody">'+
      '<div class="stats" style="margin:0">'+
        '<div class="st"><b>'+un+'</b><span>Unidades</span></div>'+
        '<div class="st"><b>'+state.suggestions.length+'</b><span>Anotaciones</span></div>'+
        '<div class="st"><b>'+state.eans.length+'</b><span>Códigos EAN</span></div>'+
        '<div class="st"><b style="font-size:13px;padding-top:4px">'+esc(fmtDate(state.actualizado))+'</b><span>Último cambio</span></div>'+
      '</div>'+
      '<p class="modenote">Todo se guarda en este dispositivo ('+esc(storageLabel())+'). No hay cuenta ni nube: si cambias de teléfono o borras los datos del navegador, el respaldo es lo único que te devuelve el cajón. Exporta uno de vez en cuando.</p>'+
      '<div class="crow" style="flex-wrap:wrap;gap:8px">'+
        '<button type="button" class="big" data-act="dexport">Exportar respaldo (.json)</button>'+
        '<button type="button" class="big alt" data-act="dcopy">Copiar JSON</button>'+
        '<button type="button" class="big alt" data-act="dimport">Importar respaldo</button>'+
        '<input type="file" id="importin" accept="application/json,.json,text/plain" hidden>'+
      '</div>'+
      (ui.data.showRaw?'<div class="field"><label>JSON del cajón</label><textarea readonly rows="6" onclick="this.select()">'+esc(serialize())+'</textarea></div>':'')+
      (p?'<div class="confirm"><span class="t">El respaldo trae <b>'+pun+' unidades</b>, '+p.suggestions.length+' anotaciones y '+p.eans.length+' códigos (último cambio '+esc(fmtDate(p.actualizado))+'). Reemplaza <b>todo</b> lo que hay ahora.</span>'+
        '<button type="button" class="big" data-act="dimport-ok">Reemplazar</button><button type="button" class="big alt" data-act="dimport-no">Cancelar</button></div>':'')+
      (ui.data.msg?'<div class="note" style="margin:0">'+esc(ui.data.msg)+'</div>':'')+
      '<div class="field"><label>Zona delicada</label>'+
        (ui.data.confirm?'<div class="confirm"><span class="t">'+(ui.data.confirm==="vacio"?"Se borran todas las unidades, anotaciones y códigos.":"Se vuelve al inventario base con el que nació la app.")+' ¿Seguro?</span>'+
          '<button type="button" class="dangerbtn" data-act="dreset-yes" data-k="'+ui.data.confirm+'">Sí, hazlo</button><button type="button" class="big alt" data-act="dreset-no">No</button></div>'
        :'<div class="crow" style="flex-wrap:wrap;gap:8px"><button type="button" class="dangerbtn" data-act="dreset" data-k="vacio">Vaciar cajón</button>'+
          '<button type="button" class="dangerbtn" data-act="dreset" data-k="base">Restaurar inventario base</button></div>')+
      '</div>'+
      '<div class="field"><label>Aplicación</label>'+
        '<div class="crow" style="flex-wrap:wrap;gap:8px;align-items:center">'+
          '<span class="mono" style="font-size:11.5px;color:var(--dim)">Cajón POSCA v'+APP_VERSION+(isStandalone()?" · instalada":" · en el navegador")+'</span>'+
          (swWaiting?'<button type="button" class="big" data-act="dupdate">Instalar actualización</button>':'<button type="button" class="big alt" data-act="dcheck">Buscar actualización</button>')+
          (installEvt?'<button type="button" class="big" data-act="dinstall">Instalar en este dispositivo</button>':'')+
        '</div>'+
        (isIOS()&&!isStandalone()?'<p class="modenote">En iPhone: toca <b>Compartir</b> en Safari y luego <b>Añadir a pantalla de inicio</b>. Así se abre como app, a pantalla completa y con cámara.</p>':'')+
      '</div>'+
    '</div></div></div>';
  ov.innerHTML=h;
  var fi=byId("importin"); if(fi) fi.addEventListener("change",function(e){ importBackupFile(e.target.files&&e.target.files[0]); });
}
function checkUpdate(){
  if(!swReg){ ui.data.msg="Sin service worker (¿estás en http o en un navegador antiguo?)."; paintData(); return; }
  ui.data.msg="Buscando…"; paintData();
  swReg.update().then(function(){ setTimeout(function(){ if(!swWaiting){ ui.data.msg="Ya tienes la última versión."; paintData(); } },1200); })
  .catch(function(){ ui.data.msg="No pude comprobar (¿sin conexión?)."; paintData(); });
}
var updating=false;
function applyUpdate(){ if(swWaiting){ updating=true; swWaiting.postMessage({type:"SKIP_WAITING"}); ui.data.msg="Actualizando…"; if(ui.data.open) paintData(); } }
function registerSW(){
  if(!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").then(function(reg){
    swReg=reg;
    function watch(w){ if(!w) return; w.addEventListener("statechange",function(){ if(w.state==="installed"&&navigator.serviceWorker.controller){ swWaiting=w; setChip("update","Actualizar"); if(ui.data.open) paintData(); } }); }
    if(reg.waiting&&navigator.serviceWorker.controller){ swWaiting=reg.waiting; setChip("update","Actualizar"); }
    watch(reg.installing);
    reg.addEventListener("updatefound",function(){ watch(reg.installing); });
  }).catch(function(e){ console.warn("SW no registrado",e); });
  var reloaded=false;
  /* solo recargamos cuando el usuario pidió instalar una actualización; la primera toma de control (claim) no recarga */
  navigator.serviceWorker.addEventListener("controllerchange",function(){ if(!updating||reloaded) return; reloaded=true; flushSave(); location.reload(); });
}
window.addEventListener("beforeinstallprompt",function(e){ e.preventDefault(); installEvt=e; if(ui.data.open) paintData(); });
window.addEventListener("pagehide",flushSave);
document.addEventListener("visibilitychange",function(){ if(document.visibilityState==="hidden") flushSave(); });

/* ===================== arranque ===================== */
byId("root").innerHTML=shell();
setChip("idle","Cargando");
loadLocal().then(function(s){
  state=s; render(); setChip("idle","Listo");
  if(storageMode==="seed") queueSave();        /* primera carga: fija el estado inicial en el dispositivo */
  if(navigator.storage&&navigator.storage.persist) navigator.storage.persist().catch(function(){});
  registerSW();
}).catch(function(e){ console.error(e); state=freshState(); render(); setChip("error","Sin guardar"); });

})();
