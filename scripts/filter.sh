#!/bin/bash
[ -e ./outputs/record2.mpg ] && rm ./outputs/record2.mpg
ffmpeg -i ./outputs/record.mpg -vf "eq=brightness=-0.1:saturation=0.1,boxblur=5:1" -c:a copy ./outputs/record2.mpg
