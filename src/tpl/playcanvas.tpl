
<script src="control.js"></script>
<script type="text/javascript">
      	 var mode;
            var modelOption = {
                //点击白色背景色按钮
                changeToWhiteCall:function(){
                     cameraController.changeClearColor('white',1);
                },
                //点击黑色背景色按钮
                changeToBlackCall:function(){
                     cameraController.changeClearColor('black',1);
                },
                modelBtnArry:[

                <% for(var i = 0; i < scenceArray.length; i++){ %>
                    { title:'<%= scenceArray[i].title %>', active:<%= scenceArray[i].active %>, changeModelCall:function(){
                            var scenceId = <%=scenceArray[i].id %>;
                            mode.modelChangeEvent(scenceId);
                        }
                    },
                  <% } %>
                ]
            }
          mode = new ModelControl(modelOption);
          window.scenceId = {{defaultScenceId}};
</script>