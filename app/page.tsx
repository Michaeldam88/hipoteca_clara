"use client";

import Text from "@/ui/text/text";
import styles from "./page.module.scss";
import Button from "@/ui/button/button";
import Modal from "@/ui/modal/modal";
import { useState } from "react";
import Avatar from "@/ui/avatar/avatar";
import { Spacer } from "@/ui/spacer/spacer";

export default function Home() {
  const [modal, setModal] = useState(false);
  const [startClosingModal, setStartClosingModal] = useState(false);

  const [modal2, setModal2] = useState(false);
  const [startClosingModal2, setStartClosingModal2] = useState(false);

  const [modal3, setModal3] = useState(false);
  const [startClosingModal3, setStartClosingModal3] = useState(false);

  const lorem =
    "lorem ipsum dolor sit amet ctio culpa cupiditate orem ipsum dolor sit amet consectetium, distinctio cu orem ipsum dolor sit amet consectetium, distinctio cu? Sed corrupti porro autem. lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo fugiat aliquid sequi officiis cumque hic modi ipsam eligendi a inventore dignissimos laudantium, distinctio culpa cupiditate? Sed corrupti porro autem. lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo fugiat aliquid sequi officiis cumque hic modi ipsam eligendi a inventore dignissimos laudantium, distinctio culpa cupiditate? Sed corrupti porro autem. lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo fugiat aliquid sequi officiis cumque hic modi ipsam eligendi a inventore dignissimos laudantium, distinctio culpa cupiditate? Sed corrupti porro autem. lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo fugiat aliquid sequi officiis cumque hic modi ipsam eligendi a inventore dignissimos laudantium, distinctio culpa cupiditate? Sed corrupti porro autem.lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo fugiat aliquid sequi officiis cumque hic modi ipsam eligendi a inventore dignissimos laudantium, distinctio culpa cupiditate? Sed corrupti porro autem. ";

  const lorem2 =
    "lorem ipsum dolor sit amet ctio culpa cupiditate lorem ipsum dolor sit amet ctio culpa cupiditate lorem ipsum dolor sit amet ctio culpa cupiditate orem ipsum dolor sit lorem ipsum dolor sit amet ctio culpa cupiditate orem ipsum dolor sitlorem ipsum dolor sit amet ctio culpa cupiditate orem ipsum dolor sit amet consectetium, distinctio cu orem ipsum dolor sit amet consectetium, distinctio cu? Sed corrupti porro autem. lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo fugiat aliquid sequi officiis cumque hic modi ipsam eligendi a inventore dignissimos laudantium, distinctio culpa cupiditate? Sed corrupti porro autem. lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo fugiat aliquid sequi officiis cumque hic modi ipsam eligendi a inventore dignissimos laudantium, distinctio culpa cupiditate? Sed corrupti porro autem. lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo fugiat aliquid sequi officiis cumque hic modi ipsam eligendi a inventore dignissimos laudantium, distinctio culpa cupiditate? Sed corrupti porro autem. lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo fugiat aliquid sequi officiis cumque hic modi ipsam eligendi a inventore dignissimos laudantium, distinctio culpa cupiditate? Sed corrupti porro autem.lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo fugiat aliquid sequi officiis cumque hic modi ipsam eligendi a inventore dignissimos laudantium, distinctio culpa cupiditate? Sed corrupti porro autem. ";

  const lorem3 =
    "lorem ipsum dolor sit amet ctio culpa cupiditate orem ipsum dolor sit";
  return (
    <main className={styles.main}>
      <div className="--flex --align-center">
        <div>
          <Button
            preset="primary"
            text={"Modal"}
            disabled={false}
            onClick={() => setModal(true)}
          />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button
            preset="primary"
            text={"Modal2"}
            disabled={false}
            size="medium"
            onClick={() => setModal2(true)}
          />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button
            preset="primary"
            text={"Modal3"}
            disabled={false}
            size="big"
            onClick={() => setModal3(true)}
          />
        </div>
      </div>

      <div className="--flex --align-center">
        <div>
          <Button preset="primary" text={"Primary"} disabled={true} />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button
            preset="primary"
            text={"Primary"}
            disabled={true}
            size="medium"
          />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button
            preset="primary"
            text={"Primary"}
            disabled={true}
            size="big"
          />
        </div>
      </div>

      <div className="--flex --align-center">
        <div>
          <Button preset="primary-ghost" text={"Ghost"} disabled={false} />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button
            preset="primary-ghost"
            text={"Ghost"}
            disabled={false}
            size="medium"
          />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button
            preset="primary-ghost"
            text={"Ghost"}
            disabled={false}
            size="big"
          />
        </div>
      </div>

      <div className="--flex --align-center">
        <div>
          <Button preset="primary-ghost" text={"Ghost"} disabled={true} />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button
            preset="primary-ghost"
            text={"Ghost"}
            disabled={true}
            size="medium"
          />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button
            preset="primary-ghost"
            text={"Ghost"}
            disabled={true}
            size="big"
          />
        </div>
      </div>
      <div className="--flex --align-center">
        <div>
          <Button preset="link" text={"Link"} disabled={false} />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button preset="link" text={"Link"} disabled={false} size="medium" />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button preset="link" text={"Link"} disabled={false} size="big" />
        </div>
      </div>

      <div className="--flex --align-center">
        <div>
          <Button preset="link" text={"Link"} disabled={true} />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button preset="link" text={"Link"} disabled={true} size="medium" />
        </div>
        <Spacer size="medium"></Spacer>
        <div>
          <Button preset="link" text={"Link"} disabled={true} size="big" />
        </div>
      </div>
      <div>
        <Avatar
          roundness="full"
          path="https://static.carrefour.es/hd_510x_/crs/cdn_static/catalog/hd/942248_00_1.jpg"
        />
      </div>
      <div>
        <Text text="Texto h1" preset="headline1" />

        <Text text="Texto h2" preset="headline2" />

        <Text text="Texto h3" preset="headline3" />

        <Text text="Small" preset="small" />
        <Text text="Bold" preset="small" weight="bold" />
        <Text text="Subtle" preset="small" color="subtle" />
        <Text text="Ultra Subtle" preset="small" color="ultraSubtle" />
        <Text text="Uppercase" preset="small" transform="uppercase" />
        <Text text="capitalize" preset="small" transform="capitalize" />
        <Text text="Lowercase" preset="small" transform="lowercase" />
        <Text text="Capitalize" preset="small" />
        <Text text="Left" preset="small" />
        <Text text="Center" preset="small" align="align-center" />
        <Text text="Right" preset="small" align="align-right" />
      </div>

      {modal && (
        <Modal
          onClose={() => {
            setStartClosingModal(false);
            setModal(false);
          }}
          header={<Text text="Titulo" preset="headline3" weight="bold" />}
          content={<Text text={lorem} preset="small" />}
          footer={
            <Button
              preset="primary"
              text={"Close Modal"}
              onClick={() => setStartClosingModal(true)}
              size="big"
            />
          }
          startClosing={startClosingModal}
        />
      )}

      {modal2 && (
        <Modal
          onClose={() => {
            setStartClosingModal2(false);
            setModal2(false);
          }}
          header={<Text text="Titulo" preset="headline3" weight="bold" />}
          content={<Text text={lorem2} preset="small" />}
          footer={
            <Button
              preset="primary"
              text={"Close Modal"}
              onClick={() => setStartClosingModal2(true)}
              size="big"
            />
          }
          startClosing={startClosingModal2}
        />
      )}

      {modal3 && (
        <Modal
          onClose={() => {
            setStartClosingModal3(false);
            setModal3(false);
          }}
          header={<Text text="Titulo" preset="headline3" weight="bold" />}
          content={<Text text={lorem3} preset="small" />}
          footer={
            <Button
              preset="primary"
              text={"Close Modal"}
              onClick={() => setStartClosingModal3(true)}
              size="big"
            />
          }
          startClosing={startClosingModal3}
        />
      )}
    </main>
  );
}
