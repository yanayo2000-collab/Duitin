import { showRewardedAdMock, type RewardResult } from './admobMock';

type AdMode = 'mock' | 'admob_test';

const MODE = ((import.meta.env.VITE_AD_MODE as string) || 'mock') as AdMode;

function getPlatform(): 'android' | 'ios' | 'web' {
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  return 'web';
}

async function showRewardedAdmobTest(): Promise<RewardResult> {
  try {
    const w = window as any;
    const admob = w?.Capacitor?.Plugins?.AdMob;

    if (!admob) {
      return {
        rewarded: false,
        message: 'AdMob SDK belum tersedia di runtime ini (web). Gunakan mode mock untuk browser.',
      };
    }

    const platform = getPlatform();
    const adId =
      platform === 'android'
        ? 'ca-app-pub-3940256099942544/5224354917'
        : platform === 'ios'
          ? 'ca-app-pub-3940256099942544/1712485313'
          : '';

    if (!adId) {
      return { rewarded: false, message: 'Platform web tidak mendukung AdMob rewarded native.' };
    }

    await admob.initialize?.({ requestTrackingAuthorization: true, testingDevices: ['EMULATOR'] });
    await admob.prepareRewardVideoAd?.({ adId, isTesting: true });
    await admob.showRewardVideoAd?.();

    return {
      rewarded: true,
      rewardAmount: 1,
      rewardType: 'task_unlock',
      message: 'Iklan uji AdMob selesai ditonton.',
    };
  } catch (e) {
    return {
      rewarded: false,
      message: e instanceof Error ? e.message : 'Gagal memuat iklan AdMob test.',
    };
  }
}

export async function showRewardedAd(): Promise<RewardResult> {
  if (MODE === 'admob_test') {
    return showRewardedAdmobTest();
  }
  return showRewardedAdMock();
}

export const rewardedAdMode = MODE;
