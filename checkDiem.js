                                function showMenu() {
                                    // body...
                                    var strShow = '<div id="hdz" style="background: #bbb; position: fixed; width: 200px; height: auto; left: 20px;top: 100px; text-align: center; padding: 10px 0px;z-index:1000000;">';
                                    strShow += ' <button type="button" class="btn btn-success">Check</button>';
                                    strShow += 

                                    strShow += '<br>';
                                    strShow += '<br>';
                                  
                                    strShow += '<strong id="tbTichLuy">TB tích lũy : </strong><br>';
                                    strShow += '<strong id="tongTin">Tổng tín : </strong><br>';
                                    strShow += '<strong id="tongDiem">Tổng điểm : </strong><br>';
                                   
                                    
                                    strShow += '<p style="color:blue;">Điềm điểm vào cột tô đỏ rồi ấn check</p>';
                                    strShow += '<strong id="tbTichLuyNow">TB kỳ này  : </strong><br>';
                                    strShow += '<strong id="tongTinNow">Tổng tín kỳ này : </strong><br>';
                                    strShow += '<strong id="tongDiemNow">Tổng điểm kỳ này: </strong><br>';
                                    strShow += '<p style="color:blue;">để tích điểm kỳ hiện tại. thêm đấu "*" sau điểm (vd : 3 => 3*)</p>';
                                    

                                    strShow += ' </div>';
                                    $('body').html($('body').html() + strShow);
                                }


                                showMenu();
                                



                                var tongDiem = 0;
                                var tongTin = 0;
                                var batBuoc;
                                var tuChon;
                                $('tbody').each(function(){
                                    var tieuDe = $(this).find('tr').find('td').html();

                                    if(tieuDe.indexOf('Danh sách những học phần bắt buộc') >= 0){
                                        batBuoc = $(this);
                                        console.log(tieuDe);
                                    }

                                    if(tieuDe.indexOf('Danh sách những học phần tự chọn') >= 0){
                                        tuChon = $(this);
                                        console.log(tieuDe);
                                    }

                                   
                                });

                                var toMau = batBuoc.find('tr').eq(2).find('th').eq(6);
                                toMau.html('Điền điểm vào cột này');
                                toMau.attr('style','background:red; width : 50px;');

                                toMau = tuChon.find('tr').eq(2).find('th').eq(8);
                                toMau.html('Điền điểm vào cột này');
                                toMau.attr('style','background:red; width : 50px;');
                                
                                batBuoc.find('tr').each(function(){
                                    
                                    

                                    var diemBatBuoc = parseFloat($(this).find('td').eq(11).find('strong').html());
                                    var tinBatBuoc = parseFloat($(this).find('td').eq(5).html());
                                    console.log(tinBatBuoc);

                                    

                                    var temp = isNaN(diemBatBuoc) ? "" : diemBatBuoc;
                                    
                                        $(this).find('td').eq(11).html('<input style="min-width: 50px; text-align: center;" class="diemBatBuoc form-control" tinchi="'+ tinBatBuoc +'" type="text" name="" value="'+temp+'">');
                                    
                                    
                                });
                                var loai = -1;
                                var maxtin = 0;
                                tuChon.find('tr').each(function(){
                                    
                                 
                                    
                                    if($(this).find('td').length == 15){
                                        loai++;
                                        var diemBatBuoc = parseFloat($(this).find('td').eq(12).find('strong').html());
                                    var tinBatBuoc = parseFloat($(this).find('td').eq(6).html());
                                    console.log(tinBatBuoc);

                                    

                                    var temp = isNaN(diemBatBuoc) ? "" : diemBatBuoc;
                                    maxtin = parseFloat($(this).find('td').eq(5).html());
                                        
                                        $(this).find('td').eq(12).html('<input maxtin='+ maxtin +'  style="min-width: 50px; text-align: center;" class="diemTuChon form-control loai'+loai+'" tinchi="'+ tinBatBuoc +'" type="text" name="" value="'+temp+'">');

                                        
                                    }else if($(this).find('td').length == 13){
                                        var diemBatBuoc = parseFloat($(this).find('td').eq(10).find('strong').html());
                                    var tinBatBuoc = parseFloat($(this).find('td').eq(4).html());
                                    console.log(tinBatBuoc);

                                    

                                    var temp = isNaN(diemBatBuoc) ? "" : diemBatBuoc;
                                    
                                        $(this).find('td').eq(10).html('<input maxtin='+ maxtin +'  style="min-width: 50px; text-align: center;" class="diemTuChon form-control loai'+loai+'" tinchi="'+ tinBatBuoc +'" type="text" name="" value="'+temp+'">');
                                    }

                                    
                                    
                                    
                                });
                                var tongDiemHienTai = 0;
                                var tongTinHienTai = 0;

                                function loaiMax(loai, check) {
                                    // body...
                                    var maxtin = parseFloat(loai.attr('maxtin'));
                                    console.log('max tin : ' + maxtin);
                                    var arr = new Array();
                                    var diem = 0;
                                    var tin = 0;

                                    if(!check){
                                        $.each(arr,function(index,value){
                                           
                                                tin += value.tin;
                                                diem += value.diem * value.tin;
                                                
                                        
                                        });


                                        return {'tin' : tin, 'diem' : diem};
                                    }

                                    loai.each(function(){
                                        arr.push({'tin':$(this).attr('tinchi'), 'diem':$(this).val()});
                                        if(!check && $(this).val().indexOf('*')){
                                            tongTinHienTai += parseFloat($(this).attr('tinchi'));
                                            tongDiemHienTai += parseFloat($(this).attr('tinchi')) * parseFloat($(this).val());
                                        }


                                    });
         
                                    arr.sort(function(a,b){
                                        if(a.diem < b.diem){
                                            return 1;
                                        }
                                        if(a.diem > b.diem){
                                            return -1;
                                        }

                                        return 0;
                                    });

                                    



                                    $.each(arr,function(index,value){
                                        if(value.diem > 0){
                                            if(tin < maxtin){
                                            tin += value.tin;
                                            diem += value.diem * value.tin;
                                        }else{
                                            return {'tin' : tin, 'diem' : diem};
                                        }

                                        }
                                        
                                    });


                                    return {'tin' : tin, 'diem' : diem};

                                  
                                    
                                }

                                $('#hdz').click(function(){
                                    var tongDiem = 0;
                                    var tongTin = 0;
                                    
                                    



                                    $('.diemBatBuoc').each(function(){
                                        var diemBatBuoc = parseFloat($(this).val());
                                        var tinBatBuoc = parseFloat($(this).attr('tinchi'));



                                        if(diemBatBuoc != 0 && !isNaN(diemBatBuoc)){
                                            

                                            tongTin += tinBatBuoc;


                                            tongDiem += diemBatBuoc*tinBatBuoc;
                                            
                                        }

                                        //tinh diem hien tai


                                        if($(this).val().indexOf('*') >= 0 && !isNaN(diemBatBuoc)){
                                                
                                                tongTinHienTai += tinBatBuoc;


                                                tongDiemHienTai += diemBatBuoc*tinBatBuoc;
                                                
                                            
                                        }

                                        
                                   


                                    });


                                    console.log('tong diem bat buoc : ' + tongDiem);
                                    console.log('tong tin bat buoc :' + tongTin);
                                    
                                    
                                    for(var i = 0; i <= loai; ++i){
                                        var tmp = loaiMax($('.loai'+i + ''));
                                        console.log('loai' + i);
                                        tongDiem += parseFloat(tmp.diem);
                                        tongTin += parseFloat(tmp.tin);
                                        console.log('==============================');
                                        console.log(tmp.tin + '\t' + tmp.diem);
                                        console.log('==============================');



                                    }




                                
                                    




                                    var tbTichLuy =  (tongDiem/tongTin);
                                    tbTichLuy = Math.round(tbTichLuy * 1000)/1000;
                                    $('#tbTichLuy').html('TB tích Lũy : ' + tbTichLuy);
                                    $('#tongTin').html('Tổng Tín : ' + tongTin);
                                    $('#tongDiem').html('Tổng Điểm : ' + tongDiem);


                                    var tbHienTai = tongDiemHienTai/tongTinHienTai;
                                    tbHienTai = Math.round(tbHienTai * 1000)/1000;


                                    $('#tbTichLuyNow').html('TB kỳ này  :' + tbHienTai);
                                    $('#tongTinNow').html('Tổng tín kỳ này :' + tongTinHienTai);
                                    $('#tongDiemNow').html('Tổng điểm kỳ này:' + tongDiemHienTai);





                                });

                                $( "#hdz" ).trigger( "click" );

