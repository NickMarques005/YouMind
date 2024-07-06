import { UseLoading } from '@hooks/loading/UseLoading';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import { TypeNotification } from 'types/notification/Notification_Types';
import { UseNotificationFilter } from './hooks/UseNotificationFilter';
import { UseNotifications } from '@features/app/reducers/NotificationReducer';
import NotificationList from './components/NotificationList';
import NoNotifications from './components/NoNotifications';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { UseAppNavigation } from '../../../hooks/UseAppNavigation';
import DefaultLoading from '@components/loading/DefaultLoading';
import DefaultModal from '@components/modals/default/DefaultModal';
import Solicitation from './components/Solicitation';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseNotificationManager } from './hooks/UseNotificationManager';
import LoadingScreen from '@components/loading/LoadingScreen';

const NotificationSession = () => {
    const { navigateToAppScreen } = UseAppNavigation();
    const { userData } = UseForm();
    const { state } = UseNotifications();
    const { userType } = UseAuth();
    const modalLoading = UseLoading();
    const { loading, setLoading } = UseLoading(true);
    const deleteLoading = UseLoading();
    const typeNotificationsInitial: TypeNotification[] = [
        { typeName: "Todos", isOn: true, type: 'all' },
        { typeName: "Tratamento", isOn: false, type: 'treatment' },
        { typeName: "Chat", isOn: false, type: 'chat' },
        { typeName: "Atualizações", isOn: false, type: 'update' }
    ]

    const colorLoading = userType === 'doctor' ? '#1e6569' : '#651e69';
    const { filteredNotifications, typeNotifications, handleFilterNotifications } = UseNotificationFilter({ typeNotificationsInitial, notifications: state.notifications, setLoading, loading });
    const { handleClearSelectedNotification, handleNotificationAccept, handleNotificationPress, selectedNotification, groupNotificationsBySender} = UseNotificationManager({ setModalLoading: modalLoading.setLoading, setDeleteNotificationLoading: deleteLoading.setLoading , userType, userData});

    return (
        <View style={styles.notifications_mainView}>
            {
                modalLoading.loading && <LoadingScreen isApp={true}/>
            }
            <Header userType={userType} typeNotifications={typeNotifications} navigate={navigateToAppScreen} handleFilterNotifications={handleFilterNotifications} />
            <View style={styles.notificationMessageList_view} >
                {
                    loading ?
                        <DefaultLoading size={50} color={colorLoading} />
                        : userType && filteredNotifications && filteredNotifications.length > 0 ?
                            <NotificationList groupNotificationsBySender={groupNotificationsBySender} handleNotificationPress={handleNotificationPress} filteredNotifications={filteredNotifications} userType={userType} />
                            : <NoNotifications />
                }
            </View>

            {
                userData && selectedNotification &&
                <Solicitation
                    userData={userData}
                    selectedNotification={selectedNotification}
                    modalLoading={modalLoading}
                    handleClearSelectedNotification={handleClearSelectedNotification}
                    handleNotificationAccept={handleNotificationAccept}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    notifications_mainView: {
        width: screenWidth,
        minHeight: screenHeight,
        display: 'flex',
        flexDirection: 'column',
    },
    notificationMessageList_view: {
        flex: 1,
        paddingTop: '50%',
    },
});

export default NotificationSession;