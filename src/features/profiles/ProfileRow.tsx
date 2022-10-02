import { LoginStatusType, ProfileDTO } from "../../models/models";
import ImageContent from "./ImageNumber";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router";
import { getProfileConnection } from "./profileActions";

const coin = require("../../../../assets/profiles/coin.png");
const checked = require("../../../../assets/profiles/checked.png");
const contract = require("../../../../assets/profiles/contract.png");
const hourglass = require("../../../../assets/profiles/hourglass.png");
const tasks = require("../../../../assets/profiles/tasks.png");
const man = require("../../../../assets/profiles/man.png");
const cancel = require("../../../../assets/profiles/cancel.png");
const RefreshImage = require("../../../../assets/refresh.png");

const templateProfile = {
  email: "iavor.orlyov1@gmail.com",
  wonTargetsCount: 37,
  activeBidsCount: 11,
  unassignedCount: 3,
  transferListCount: 72,
  outbidded: 3,
  coins: 2486919,
  status: LoginStatusType.Successful,
} as ProfileDTO;

const ProfileRow = ({
  profile,
  onRefresh,
}: {
  profile: ProfileDTO;
  onRefresh: (profileId: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  return (
    <div
      style={{
        width: "clamp(200px, 60%, 700px)",
        borderLeft: "6px solid #2196F3",
        padding: "10px",
        margin: "10px",
      }}
      onClick={() => {
        navigation(`${profile.email}`);
      }}
    >
      <div
        style={{
          display: "flex",
          placeItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            paddingBottom: "6px",
            marginRight: "12px",
            flex: 3,
          }}
        >
          <ImageContent src={man} alt="Profile" content={profile.email} />
        </div>
        <ImageContent src={coin} alt="Coins" content={profile.coins} />
        <img
          src={RefreshImage}
          alt="Refresh"
          style={{
            width: "24px",
            height: "24px",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            getProfileConnection(dispatch).then((connection) => {
              connection.invoke("OnProfileRefresh", profile.id);
            });
          }}
        />
      </div>
      <div style={{ placeItems: "center", display: "flex" }}>
        <ImageContent
          src={cancel}
          alt="Outbidded count"
          content={profile.outbidded}
        />
        <ImageContent
          src={checked}
          alt="Won targets count"
          content={profile.wonTargetsCount}
        />
        <ImageContent
          src={contract}
          alt="Transfer list count"
          content={profile.transferListCount}
        />
        <ImageContent
          src={hourglass}
          alt="Active bids count"
          content={profile.activeBidsCount}
        />
        <ImageContent
          src={tasks}
          alt="Unassigned count"
          content={profile.unassignedCount}
        />
      </div>
    </div>
  );
};

export default ProfileRow;
