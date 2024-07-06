import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Player } from '@react-native-community/audio-toolkit'
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { ConvertFromISOToTimeHours } from '@utils/date/DateConversions';
import { MessageTemplate } from 'types/chat/Chat_Types';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { UseAudioPlayer } from '@features/app/providers/sub/AudioPlayerProvider';


interface AudioPlayerProps {
    ownMessage: boolean;
    message: MessageTemplate;
    url: string;
    showUserIcon: boolean;
    totalDuration?: string;
}

const AudioPlayer = ({ totalDuration, url, message, ownMessage, showUserIcon }: AudioPlayerProps) => {
    const { playerRef, currentUrl, handleCurrentUrl } = UseAudioPlayer();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState<number>(0);

    const setupPlayer = () => {
        console.log("Current Url Audio: ", url);
        if (url !== currentUrl) {
            handleCurrentUrl(url);
        }

        playerRef.current = new Player(url, { autoDestroy: false});

        console.log(playerRef);
        playerRef.current?.prepare((err) => {
            if (err) {
                console.log("Error preparing player:", err);
                return;
            }
            setDuration(playerRef.current?.duration || 0);
            playerRef.current?.play((err) => {
                if (err) {
                    console.log("Error playing audio:", err);
                }
                setIsPlaying(true);
            });
        });
    };

    useEffect(() => {
        if (!playerRef.current?.isPlaying) {
            setIsPlaying(false);
            setProgress(0);
        }
    }, [playerRef.current?.isPlaying]);

    useEffect(() => {
        if (isPlaying && playerRef.current) {
            const interval = setInterval(() => {
                setProgress(playerRef.current?.currentTime || 0);
            }, 750);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);



    const playPauseAudio = async () => {
        if (!playerRef.current || url !== currentUrl) {
            setupPlayer();
        } else if (playerRef.current && isPlaying) {
            playerRef.current.pause((err) => {
                if (err) {
                    console.log("Error pausing audio:", err);
                }
                setIsPlaying(false);
            });
        } else {
            playerRef.current.play((err) => {
                if (err) {
                    console.log("Error playing audio:", err);
                }
                setIsPlaying(true);
                setDuration(playerRef.current?.duration || 0);
            });
        }
    };

    const onSliderValueChange = (value: number) => {
        playerRef.current?.seek(value);
        setProgress(value);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.playerView}>
                    <TouchableOpacity onPress={playPauseAudio} style={styles.playPauseButton}>
                        <Icon name={ isPlaying ? 'pause' : 'play'} size={25} color="white" />
                    </TouchableOpacity>
                    <View style={styles.sliderView}>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={duration}
                            value={progress}
                            onSlidingComplete={onSliderValueChange}
                            minimumTrackTintColor={"#e6ecf0"}
                            maximumTrackTintColor={"#b8b6b6"}
                            thumbTintColor={"#dfe5f0"}
                        />
                        <Text style={styles.timerText}>
                            {
                                progress !== 0 ?
                                    `${Math.floor(progress / 60000)}:${Math.floor((progress / 1000) % 60).toString().padStart(2, '0')}`
                                    :
                                    totalDuration ? totalDuration : '0:00'
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default AudioPlayer

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: screenHeight * 0.04,
        width: screenWidth * 0.5,
        paddingStart: 10,
    },
    playerView: {
        flexDirection: 'row',
        gap: 15,
    },
    playPauseButton: {
    },
    sliderView: {
        flex: 1,
        alignItems: 'flex-end',
    },
    slider: {
        width: '100%',
    },
    timerText: {
        fontSize: 12,
        paddingEnd: 15,
        color: 'rgba(182, 185, 191, 0.8)'
    }
})