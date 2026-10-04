/* Local image preparation. No network, storage or inferred medicine identity. */
'use strict';
window.PhotoTools=(()=>{
 const tr=(zh,en,yue)=>MedLocale.choose(zh,en,yue);let pending=null,epoch=0;
 function cancel(){epoch++;pending?.();}
 async function edit(file){
  cancel();const request=epoch,src=URL.createObjectURL(file),img=new Image();
  try{img.src=src;await img.decode();}finally{URL.revokeObjectURL(src);}
  if(request!==epoch)return null;
  return new Promise(resolve=>{
   const d=document.createElement('dialog');d.id='photo-editor';d.style.cssText='width:min(620px,94vw);max-height:90dvh;padding:20px;box-sizing:border-box';
   d.innerHTML=`<h2>${tr('框選清楚的標籤','Select the label','框住清楚嘅標籤')}</h2><p>${tr('拖曳框選一項藥品的印刷藥名及 HK 號。避開反光和個人資料；手寫字可能讀不準。','Drag around one printed medicine name and HK number. Avoid glare and personal details. Handwriting may not read correctly.')}</p><canvas id="photo-crop" style="display:block;width:100%;max-height:48vh;object-fit:contain;touch-action:none;cursor:crosshair" aria-label="${tr('拖曳框選標籤；亦可直接使用整張圖片','Drag to select a label, or read the full image below')}"></canvas><div class="button-row"><button class="button secondary" id="photo-rotate">${tr('旋轉 90°','Rotate 90°')}</button><button class="button secondary" id="photo-full">${tr('整張圖片','Full image')}</button></div><label>${tr('標籤文字','Label text')} <select id="photo-script"><option value="mixed">${tr('中文及英文','Chinese + English')}</option><option value="chi_tra">${tr('中文為主','Mostly Chinese')}</option><option value="eng">${tr('英文為主','Mostly English')}</option></select></label><p id="photo-crop-note" role="status"></p><div class="button-row"><button class="button primary" id="photo-read">${tr('識別所選範圍','Read selected area')}</button><button class="button secondary" id="photo-cancel">${tr('取消','Cancel')}</button></div>`;
   document.body.append(d);const c=d.querySelector('canvas'),ctx=c.getContext('2d');let angle=0,rect=[0,0,1,1],start=null,done=false;
   const source=document.createElement('canvas');
   function orient(){const swap=angle%180!==0,scale=Math.min(1,4096/Math.max(img.width,img.height));source.width=Math.round((swap?img.height:img.width)*scale);source.height=Math.round((swap?img.width:img.height)*scale);const x=source.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,source.width,source.height);x.translate(source.width/2,source.height/2);x.rotate(angle*Math.PI/180);x.drawImage(img,-img.width*scale/2,-img.height*scale/2,img.width*scale,img.height*scale);c.width=source.width;c.height=source.height;rect=[0,0,1,1];draw();}
   function draw(){ctx.drawImage(source,0,0);const [x,y,w,h]=rect;ctx.fillStyle='rgba(9,30,45,.5)';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(source,x*c.width,y*c.height,w*c.width,h*c.height,x*c.width,y*c.height,w*c.width,h*c.height);ctx.strokeStyle='#0075bd';ctx.lineWidth=Math.max(3,c.width/180);ctx.strokeRect(x*c.width,y*c.height,w*c.width,h*c.height);d.querySelector('#photo-crop-note').textContent=tr('只讀取藍框內的文字，結果仍須對照標籤。','Only the blue area will be read. Check the result against the label.');}
   // Match the canvas element to its image ratio so pointer coordinates are exact.
   c.style.maxHeight='none';c.style.width='100%';
   const point=e=>{const b=c.getBoundingClientRect();return [Math.max(0,Math.min(.999,(e.clientX-b.left)/b.width)),Math.max(0,Math.min(.999,(e.clientY-b.top)/b.height))]};
   c.onpointerdown=e=>{start=point(e);c.setPointerCapture(e.pointerId);};c.onpointermove=e=>{if(!start)return;const end=point(e);rect=[Math.min(start[0],end[0]),Math.min(start[1],end[1]),Math.max(.02,Math.abs(start[0]-end[0])),Math.max(.02,Math.abs(start[1]-end[1]))];rect[2]=Math.min(rect[2],1-rect[0]);rect[3]=Math.min(rect[3],1-rect[1]);draw();};c.onpointerup=c.onpointercancel=()=>{start=null;};
   const finish=value=>{if(done)return;done=true;pending=null;d.close();d.remove();source.width=source.height=c.width=c.height=1;resolve(value);};pending=()=>finish(null);d.oncancel=e=>{e.preventDefault();finish(null);};
   d.querySelector('#photo-cancel').onclick=()=>finish(null);d.querySelector('#photo-full').onclick=()=>{rect=[0,0,1,1];draw();};d.querySelector('#photo-rotate').onclick=()=>{angle=(angle+90)%360;orient();};
   d.querySelector('#photo-read').onclick=async()=>{const script=d.querySelector('#photo-script').value;d.querySelector('#photo-read').disabled=true;const [x,y,w,h]=rect,out=document.createElement('canvas'),scale=Math.min(2,2600/Math.max(w*source.width,h*source.height));out.width=Math.max(1,Math.round(w*source.width*scale))+24;out.height=Math.max(1,Math.round(h*source.height*scale))+24;const a=out.getContext('2d');a.fillStyle='#fff';a.fillRect(0,0,out.width,out.height);a.drawImage(source,x*source.width,y*source.height,w*source.width,h*source.height,12,12,out.width-24,out.height-24);const blob=await new Promise(r=>out.toBlob(r,'image/png'));out.width=out.height=1;if(done)return;finish(blob?{file:new File([blob],'selected-label.png',{type:'image/png'}),script}:null);};
   orient();d.showModal();d.querySelector('h2').tabIndex=-1;d.querySelector('h2').focus();d.scrollTop=0;
  });
 }
 return {edit,cancel};
})();
