export type RewardResult = {
  rewarded: boolean;
  rewardAmount?: number;
  rewardType?: string;
  message?: string;
};

// Mock AdMob rewarded ad flow for testing.
// Later you can replace this implementation with real SDK calls.
export async function showRewardedAdMock(): Promise<RewardResult> {
  await new Promise((r) => setTimeout(r, 1400));

  // 85% success rate for demo flow
  const ok = Math.random() < 0.85;
  if (!ok) {
    return {
      rewarded: false,
      message: 'Iklan belum siap. Coba lagi sebentar.',
    };
  }

  return {
    rewarded: true,
    rewardAmount: 1,
    rewardType: 'task_unlock',
    message: 'Iklan selesai ditonton.',
  };
}
