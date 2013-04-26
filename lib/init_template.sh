#!/bin/bash

dir=`dirname $0`;

app_cwd="{{cwd_full_path}}"
app_exe="{{exe_full_path}}";
app_args="{{app_args}}";

pid_file="{{pid_file_full_path}}"
log_file="{{log_file_full_path}}"

start() {
    if [[ -f $pid_file ]]; then
        echo "$pid_file exists, process is already running or crashed";
    else
        echo "Settind current working directory to $app_cwd";
        cd $app_cwd

        echo "Starting node process $app_exe ...";
        $app_exe $app_args 1>$log_file 2>&1 &

        echo $! > $pid_file;
    fi
}

stop() {
    if [[ ! -f $pid_file ]]; then
        echo "$pid_file does not exist, process is not running";
    else
        echo "Stopping node process $app_exe ...";
        kill `cat $pid_file`;
        rm -f $pid_file;

        echo "Setting current working directory to $dir";
        cd $dir;
    fi
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart|reload)
        stop
        start
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}";
        exit 1;
esac
exit 0;

