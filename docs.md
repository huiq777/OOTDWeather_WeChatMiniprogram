# 1. 请求天气API

- 请求方式：

```bash
curl -X POST 'https://api.coze.cn/v1/workflow/run' \
-H "Authorization: Bearer pat_VTzZDAvbLIGlYKc8aITPqao96vRKJ6xFreeSMMOKCcY6LamjtJNRpyGgQibhlyHG" \
-H "Content-Type: application/json" \
-d '{
  "parameters": {
    "city": "北京"
  },
  "workflow_id": "7494034599787397132",
  "app_id": "7494009584336683060"
}'
```

- 返回值：
```json
{"code":0,"cost":"0","data":"{\"output\":[{\"condition\":\"多云\",\"humidity\":23,\"predict_date\":\"2025-04-17\",\"temp_high\":29,\"temp_low\":15,\"weather_day\":\"多云\",\"wind_dir_day\":\"北风\",\"wind_dir_night\":\"北风\",\"wind_level_day\":\"3\",\"wind_level_night\":\"1\"},{\"condition\":\"中雨\",\"humidity\":50,\"predict_date\":\"2025-04-18\",\"temp_high\":16,\"temp_low\":8,\"weather_day\":\"中雨\",\"wind_dir_day\":\"南风\",\"wind_dir_night\":\"西南风\",\"wind_level_day\":\"1\",\"wind_level_night\":\"1\"},{\"condition\":\"多云\",\"humidity\":57,\"predict_date\":\"2025-04-19\",\"temp_high\":21,\"temp_low\":11,\"weather_day\":\"多云\",\"wind_dir_day\":\"西南风\",\"wind_dir_night\":\"西南风\",\"wind_level_day\":\"1\",\"wind_level_night\":\"1\"},{\"condition\":\"多云\",\"humidity\":50,\"predict_date\":\"2025-04-20\",\"temp_high\":23,\"temp_low\":12,\"weather_day\":\"多云\",\"wind_dir_day\":\"南风\",\"wind_dir_night\":\"东南风\",\"wind_level_day\":\"1\",\"wind_level_night\":\"1\"},{\"condition\":\"阴\",\"humidity\":67,\"predict_date\":\"2025-04-21\",\"temp_high\":19,\"temp_low\":12,\"weather_day\":\"阴\",\"wind_dir_day\":\"西北风\",\"wind_dir_night\":\"北风\",\"wind_level_day\":\"1\",\"wind_level_night\":\"3\"},{\"condition\":\"晴\",\"humidity\":21,\"predict_date\":\"2025-04-22\",\"temp_high\":24,\"temp_low\":13,\"weather_day\":\"晴\",\"wind_dir_day\":\"西南风\",\"wind_dir_night\":\"西南风\",\"wind_level_day\":\"1\",\"wind_level_night\":\"1\"},{\"condition\":\"多云\",\"humidity\":17,\"predict_date\":\"2025-04-23\",\"temp_high\":26,\"temp_low\":12,\"weather_day\":\"多云\",\"wind_dir_day\":\"北风\",\"wind_dir_night\":\"北风\",\"wind_level_day\":\"1\",\"wind_level_night\":\"1\"},{\"condition\":\"晴\",\"humidity\":13,\"predict_date\":\"2025-04-24\",\"temp_high\":22,\"temp_low\":13,\"weather_day\":\"晴\",\"wind_dir_day\":\"北风\",\"wind_dir_night\":\"西北风\",\"wind_level_day\":\"1\",\"wind_level_night\":\"1\"}]}","debug_url":"https://www.coze.cn/work_flow?execute_id=7494301778730188840&space_id=7494012242959630347&workflow_id=7494034599787397132&execute_mode=2","msg":"Success","token":0}
```

# 2. AI OOTD API

- 请求方式：

```bash
curl -X POST 'https://api.coze.cn/v1/workflow/run' \
-H "Authorization: Bearer pat_VTzZDAvbLIGlYKc8aITPqao96vRKJ6xFreeSMMOKCcY6LamjtJNRpyGgQibhlyHG" \
-H "Content-Type: application/json" \
-d '{
  "parameters": {
    "city": "北京",
    "gender": "男",
    "personality": "戴眼镜",
    "selectedStyle": "日系",
    "weather": {
      "condition": "晴",
      "humidity": 13,
      "predict_date": "2025-04-24",
      "temp_high": 22,
      "temp_low": 13,
      "weather_day": "晴",
      "wind_dir_day": "北风",
      "wind_dir_night": "西北风",
      "wind_level_day": "1",
      "wind_level_night": "1"
    }
  },
  "workflow_id": "7494036395154194451",
  "app_id": "7494009584336683060"
}'
```

- 返回值：
```json
{"code":0,"cost":"0","data":"{\"advice\":\"北京今日最高温度22℃，最低温度13℃，天气晴朗且风力较小。日系风格注重简约舒适。上身可以选择一件米白色宽松短袖衬衫，内搭浅灰色棉质T恤，增加层次感。下身搭配一条深蓝色直筒牛仔裤，展现随性自在感。再配上一双白色的日系休闲鞋，轻便又好看。考虑到昼夜有一定温差，可携带一件薄款的卡其色风衣，需要时披上，既保暖又能提升整体穿搭的时尚感。眼镜可以选择黑框细边款式，进一步强化日系文艺气质。\",\"photo\":[\"https://s.coze.cn/t/YPzwgXh58As/\",\"https://s.coze.cn/t/NtI8kvVYJpU/\",\"https://s.coze.cn/t/DaQSzjxWt0w/\"]}","debug_url":"https://www.coze.cn/work_flow?execute_id=7494303517021896740&space_id=7494012242959630347&workflow_id=7494036395154194451&execute_mode=2","msg":"Success","token":2456}
```
